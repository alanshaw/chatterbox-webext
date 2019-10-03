/* eslint-env browser */

import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withChatterbox } from './Chatterbox'

export class PeersList extends Component {
  state = { peerInfo: null, peers: [] }

  async componentDidMount () {
    const { cbox } = this.props
    const controller = this.abortController = new AbortController()

    const peerInfo = await cbox.peer.get()
    this.setState({ peerInfo })

    this.subscribePeers(controller.signal)
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

  handlePeerClick = e => {
    const peerId = e.currentTarget.getAttribute('data-peer-id')
    this.props.onPeerClick(peerId)
  }

  render () {
    const { peers } = this.state
    return (
      <div>
        <h1>Peers</h1>
        {peers.length ? (
          <ul>
            {peers.map(({ id, name }) => {
              return (
                <li key={id} title={name ? `${name} (${id})` : id}>
                  <button data-peer-id={id} className='pointer' onClick={this.handlePeerClick}>
                    <Identicon string={id} size={30} />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No peers seen in the last hour</p>
        )}
      </div>
    )
  }
}

export default withChatterbox(PeersList)
