/* eslint-env browser */

import React, { Component } from 'react'
import { withChatterbox } from './lib/Chatterbox'
import PeersList from './PeersList'
import FriendsList from './FriendsList'
import BroadcastMessagePanel from './BroadcastMessagePanel'
import PeerInfoPanel from './PeerInfoPanel'
import AddFriendPanel from './AddFriendPanel'

const Panels = {
  PeerInfoPanel,
  AddFriendPanel,
  BroadcastMessagePanel
}

export class OverviewPage extends Component {
  state = { panelName: 'BroadcastMessagePanel', panelProps: {} }

  handlePeerClick = peerId => this.setState({
    panelName: 'PeerInfoPanel',
    panelProps: { peerId }
  })

  handlePanelClose = () => this.setState({
    panelName: 'BroadcastMessagePanel',
    panelProps: {}
  })

  handleAddFriendClick = () => this.setState({
    panelName: 'AddFriendPanel',
    panelProps: { onAdd: this.handleAddFriend }
  })

  handleAddFriend = peerId => this.setState({
    panelName: 'PeerInfoPanel',
    panelProps: { peerId }
  })

  render () {
    const { panelName, panelProps } = this.state
    const Panel = Panels[panelName]

    return (
      <div className='flex h-100'>
        <div className='overflow-y-scroll h-100 flex-none'>
          <PeersList onPeerClick={this.handlePeerClick} />
        </div>
        <div className='overflow-y-scroll h-100 flex-none'>
          <FriendsList onFriendClick={this.handlePeerClick} onAddFriendClick={this.handleAddFriendClick} />
        </div>
        <div className='overflow-y-scroll h-100 flex-auto'>
          <Panel {...panelProps} onClose={this.handlePanelClose} />
        </div>
      </div>
    )
  }
}

export default withChatterbox(OverviewPage)
