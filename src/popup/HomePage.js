/* eslint-env browser */

import React, { Component } from 'react'
import PeersList from './PeersList'
import FriendsList from './FriendsList'
import BroadcastMessagePanel from './BroadcastMessagePanel'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      peerInfo: null,
      peers: [],
      friends: []
    }
  }

  async componentDidMount () {
    const { cbox } = this.props
    const controller = this.abortController = new AbortController()

    const peerInfo = await cbox.peer.get()
    this.setState({ peerInfo })

    this.subscribePeers(controller.signal)
    this.subscribeFriends(controller.signal)
  }

  componentWillUnmount () {
    this.abortController.abort()
  }

  async subscribePeers (signal) {
    const { cbox } = this.props
    const hour = 1000 * 60 * 60
    const lastHour = () => Date.now() - hour

    const filter = peerInfo => {
      if (peerInfo.id === this.state.peerInfo.id) return false
      if (!peerInfo.lastSeenAt) return false
      return peerInfo.lastSeenAt >= lastHour()
    }

    try {
      for await (const peers of cbox.peers.feed({ filter, signal })) {
        this.setState({ peers })
      }
    } catch (err) {
      if (err.type !== 'aborted') throw err
    }
  }

  async subscribeFriends (signal) {
    const { cbox } = this.props
    try {
      for await (const friends of cbox.friends.feed({ signal })) {
        this.setState({ friends })
      }
    } catch (err) {
      if (err.type !== 'aborted') throw err
    }
  }

  async handleMessageSend (text) {
    const { cbox } = this.props
    await cbox.messages.broadcast(text)
  }

  render () {
    const { peerInfo, peers, friends } = this.state
    return (
      <div className='flex h-100'>
        <PeersList peers={peers} />
        <FriendsList friends={friends} />
        <BroadcastMessagePanel peerInfo={peerInfo} onSend={text => this.handleMessageSend(text)} />
      </div>
    )
  }
}

export default App
