const IPFS = require('ipfs')
const Chatterbox = require('chatterbox-core')
const browser = require('webextension-polyfill')
const log = require('debug')('chatterbox-webext:background')
const swarmBind = require('ipfs-swarm-bind-shim')

const Relays = process.env.CHATTERBOX_RELAY_ADDRS
  ? process.env.CHATTERBOX_RELAY_ADDRS.split(',')
  : []

async function main () {
  // TODO: use IPFS API to attmpt to connect to a local daemon before starting
  // our own. Local daemon will have access to MDNS for local discovery so
  // gives us quick messaging between local peers.
  const ipfs = await IPFS.create()
  const cbox = await Chatterbox(ipfs)

  await cbox.peers.gc()
  await swarmBind(ipfs, Relays)

  // Expose cbox so popup can access it
  window.cbox = cbox

  log('📬 chatterbox ready!')

  let prevFriends = []

  for await (const friends of cbox.friends.feed()) {
    const newMessageFriends = getFriendsWithNewMessages(prevFriends, friends)

    while (newMessageFriends.length) {
      const friend = newMessageFriends.pop()

      try {
        await browser.notifications.create({
          type: 'basic',
          iconUrl: browser.extension.getURL('images/icon.svg'),
          title: `Message from ${friend.name || friend.id}`,
          message: truncate(friend.lastMessage.text, 30)
        })
      } catch (err) {
        log(err)
      }
    }

    const unreadCount = friends.reduce((count, { lastMessage }) => {
      return lastMessage && !lastMessage.readAt ? count + 1 : count
    }, 0)

    try {
      await browser.browserAction.setBadgeBackgroundColor({ color: '#ea5037' })
      await browser.browserAction.setBadgeTextColor({ color: 'white' })
      await browser.browserAction.setBadgeText({ text: unreadCount ? `${unreadCount}` : '' })
    } catch (err) {
      log(err)
    }

    prevFriends = friends
  }
}

function truncate (str, len) {
  return str.length <= len ? str : str.slice(0, len) + '…'
}

function getFriendsWithNewMessages (prevFriends, friends) {
  return friends.reduce((friends, f) => {
    if (!f.lastMessage) return friends

    const prev = prevFriends.find(p => p.id === f.id)
    if (!prev) return friends

    if (!prev.lastMessage || f.lastMessage.id !== prev.lastMessage.id) {
      return friends.concat(f)
    }

    return friends
  }, [])
}

main()
