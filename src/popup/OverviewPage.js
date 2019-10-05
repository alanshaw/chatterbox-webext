/* eslint-env browser */

import React, { Component } from 'react'
import { withChatterbox } from './Chatterbox'
import PeersList from './PeersList'
import FriendsList from './FriendsList'
import BroadcastMessagePanel from './BroadcastMessagePanel'
import PeerInfoPanel from './PeerInfoPanel'

export class OverviewPage extends Component {
  state = { selectedPeerId: null }

  handlePeerClick = peerId => this.setState({ selectedPeerId: peerId })

  handlePeerInfoClose = () => this.setState({ selectedPeerId: null })

  render () {
    const { selectedPeerId } = this.state

    return (
      <div className='flex h-100'>
        <div className='overflow-y-scroll h-100 flex-none'>
          <PeersList onPeerClick={this.handlePeerClick} />
        </div>
        <div className='overflow-y-scroll h-100 flex-none'>
          <FriendsList onFriendClick={this.handlePeerClick} />
        </div>
        <div className='overflow-y-scroll h-100 flex-auto'>
          {selectedPeerId ? (
            <PeerInfoPanel peerId={selectedPeerId} onClose={this.handlePeerInfoClose} />
          ) : (
            <BroadcastMessagePanel />
          )}
        </div>
      </div>
    )
  }
}

export default withChatterbox(OverviewPage)
