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
        <PeersList onPeerClick={this.handlePeerClick} />
        <FriendsList onFriendClick={this.handlePeerClick} />
        {selectedPeerId ? (
          <PeerInfoPanel peerId={selectedPeerId} onClose={this.handlePeerInfoClose} />
        ) : (
          <BroadcastMessagePanel />
        )}
      </div>
    )
  }
}

export default withChatterbox(OverviewPage)
