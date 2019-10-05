/* eslint-env browser */

import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withChatterbox } from './Chatterbox'

export class PeerInfoPanel extends Component {
  state = { peerInfo: null, messages: [], isFriend: false }

  async componentDidMount () {
    this.init()
  }

  async componentDidUpdate (prevProps) {
    if (this.props.peerId === prevProps.peerId) return
    this.abortController.abort()
    this.init()
  }

  componentWillUnmount () {
    this.abortController.abort()
  }

  async init () {
    const { cbox, peerId } = this.props
    const controller = this.abortController = new AbortController()

    this.subscribeMessages(peerId, controller.signal)
    this.subscribeFriends(controller.signal)

    const peerInfo = await cbox.peers.get(peerId)
    this.setState({ peerInfo })
  }

  async subscribeMessages (peerId, signal) {
    const { cbox } = this.props

    try {
      for await (const messages of cbox.messages.feed(peerId, { signal })) {
        this.setState({ messages })
        messages.forEach(m => {
          if (!m.readAt) cbox.messages.read(peerId, m.id)
        })
      }
    } catch (err) {
      if (err.type !== 'aborted') throw err
    }
  }

  async subscribeFriends (signal) {
    const { cbox } = this.props
    try {
      for await (const friends of cbox.friends.feed({ signal })) {
        const isFriend = friends.some(f => f.id === this.props.peerId)
        this.setState({ isFriend })
      }
    } catch (err) {
      if (err.type !== 'aborted') throw err
    }
  }

  handleAddFriendClick = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.friends.add(this.props.peerId)
  }

  handleRemoveFriendClick = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.friends.remove(this.props.peerId)
  }

  render () {
    const { peerId, onClose } = this.props
    const { peerInfo, messages, isFriend } = this.state

    if (!peerInfo) return null

    return (
      <div className='pa3'>
        <button onClick={onClose}>Close</button>
        {isFriend ? (
          <button onClick={this.handleRemoveFriendClick}>Remove friend</button>
        ) : (
          <button onClick={this.handleAddFriendClick}>Add friend</button>
        )}
        <Identicon string={peerId} size={50} />
        {peerInfo.name ? (
          <p>{peerInfo.name}<br />{peerId}</p>
        ) : (
          <p>{peerId}</p>
        )}
        <ul>
          {messages.map(m => <li key={m.id}>{m.text}</li>)}
        </ul>
      </div>
    )
  }
}

export default withChatterbox(PeerInfoPanel)
