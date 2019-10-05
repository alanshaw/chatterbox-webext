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
    return peers.length ? (
      <div className='pa3 bg-aqua-muted' style={{ minHeight: '100%' }}>
        <img src='images/stroke_distributed.svg' width='35' className='mb2' title='Peers' />
        <ul className='list mv0 pl0'>
          {peers.map(({ id, name }) => (
            <li key={id} title={name ? `${name} (${id})` : id} className='mb2'>
              <button data-peer-id={id} className='dib bg-white-90 bw0 br1 pa1 hover-outline pointer outline-0' onClick={this.handlePeerClick} style={{ lineHeight: 0 }}>
                <Identicon string={id} size={25} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : null
  }
}

export default withChatterbox(PeersList)
