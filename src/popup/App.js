/* eslint-env browser */

import React, { Component } from 'react'
import HomePage from './HomePage'
import SetNamePage from './SetNamePage'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { peerInfo: null }
  }

  componentDidMount () {
    this.updatePeerInfo()
  }

  async updatePeerInfo () {
    const { cbox } = this.props
    const peerInfo = await cbox.peer.get()
    this.setState({ peerInfo })
  }

  render () {
    const { cbox } = this.props
    const { peerInfo } = this.state
    return (
      <div style={{ width: 640, height: 320 }}>
        {peerInfo && peerInfo.name ? (
          <HomePage cbox={cbox} />
        ) : (
          <SetNamePage cbox={cbox} onChanged={() => this.updatePeerInfo()} />
        )}
      </div>
    )
  }
}

export default App
