const IPFS = require('ipfs')
const Chatterbox = require('chatterbox-core')
const browser = require('webextension-polyfill')
const log = require('debug')('chatterbox-webext:background')

async function main () {
  const ipfs = await IPFS.create()
  const cbox = await Chatterbox(ipfs)

  // Expose cbox so popup can access it
  window.cbox = cbox

  log('🚀 IPFS and Chatterbox are ready!')

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
