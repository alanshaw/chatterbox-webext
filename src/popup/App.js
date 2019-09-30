const React = require('react')
const browser = require('webextension-polyfill')

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
      <div style={{ textAlign: 'center', width: 500, height: 500 }}>
        {peerInfo ? (
          <div>Your IPFS peer ID: {peerInfo.id}</div>
        ): null}
      </div>
    )
  }
}

module.exports = App
