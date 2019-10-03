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

  await swarmBind(Relays)

  // Expose cbox so popup can access it
  window.cbox = cbox

  log('📬 chatterbox ready!')

  // TODO: listen to messages feed and show system notification for messages from friends

  for await (const friends of cbox.friends.feed()) {
    const unreadCount = friends.reduce((count, { lastMessage }) => {
      return lastMessage && !lastMessage.readAt ? count + 1 : count
    }, 0)

    try {
      await browser.browserAction.setBadgeBackgroundColor({ color: '#ea5037' })
      await browser.browserAction.setBadgeText({ text: unreadCount ? `${unreadCount}` : '' })
    } catch (err) {
      log(err)
    }
  }
}

main()
