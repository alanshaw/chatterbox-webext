const React = require('react')
const browser = require('webextension-polyfill')
const SetNamePage = require()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      peerInfo: null,
      peers: [],
      friends: []
    }
  }

  componentDidMount () {
    this.init()
  }

  async init () {
    const { cbox } = await browser.runtime.getBackgroundPage()

    const peerInfo = await cbox.peer.get()
    this.setState({ peerInfo })
  }

  render () {
    const { peerInfo } = this.state
    return (
      <div style={{ width: 640, height: 320 }}>
        {peerInfo ? (
          <div>Your IPFS peer ID: {peerInfo.id}</div>
        ) : null}
      </div>
    )
  }
}

module.exports = App
