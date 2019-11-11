/* eslint-env browser */

import React, { Component } from 'react'
import Identicon from 'react-identicons'
import fromNow from 'fromnow'
import { withOnUnloadUnmount } from './lib/OnUnloadUnmount'
import { withChatterbox } from './lib/Chatterbox'
import StatusIndicator from './StatusIndicator'

export class PeerInfoPanel extends Component {
  state = { peerInfo: null, messages: [] }

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

  handleAddFriendClick = async e => {
    e.preventDefault()
    const { cbox, peerId } = this.props
    await cbox.friends.add(peerId)
    const peerInfo = await cbox.peers.get(peerId)
    this.setState({ peerInfo })
  }

  handleRemoveFriendClick = async e => {
    e.preventDefault()
    const { cbox, peerId } = this.props
    await cbox.friends.remove(peerId)
    const peerInfo = await cbox.peers.get(peerId)
    this.setState({ peerInfo })
  }

  render () {
    const { onClose } = this.props
    const { peerInfo, messages } = this.state

    if (!peerInfo) return null

    return (
      <div className='pa3'>
        <div class='tr'>
          <button onClick={onClose} className='transition-all f3 bg-transparent bw0 pa0 black-20 hover-black-90 pointer lh-solid'>ⓧ</button>
        </div>
        <div className='flex'>
          <div className='flex-none ml3 mr3'>
            <div className='dib bg-white-90 br1 pa3 hover-outline relative' style={{ boxShadow: '0 0 0 .2rem rgba(201, 210, 215, .4)', marginBottom: '-1rem', lineHeight: 0 }}>
              <div className='absolute' style={{ top: '-20px', right: '-15px' }}>
                {peerInfo.isFriend ? (
                  <button onClick={this.handleRemoveFriendClick} className='transition-all dib f5 bn br-100 pointer focus-outline hot-pink bg-light-pink ma2 hover-bg-gray hover-white center lh-solid' style={{ width: '30px', height: '30px' }} title='Click to remove this peer from your friends list'>❤</button>
                ) : (
                  <button onClick={this.handleAddFriendClick} className='transition-all dib f5 bn br-100 pointer focus-outline hover-hot-pink ma2 bg-gray white center lh-solid' style={{ width: '30px', height: '30px' }} title='Click to add this peer as a friend'>❤</button>
                )}
              </div>
              <Identicon string={peerInfo.id} size={50} />
            </div>
          </div>
          <div className='flex-auto pt2'>
            <div className='montserrat fw6 f7 charcoal ttu mb2'>{peerInfo.name || 'No name'}</div>
            <div
              className='montserrat fw4 f7 charcoal ttu mb2'
              title={peerInfo.lastSeenAt
                ? `Last seen ${fromNow(peerInfo.lastSeenAt, { and: true, suffix: true })}`
                : 'Never seen online!'}
            >
              <StatusIndicator lastSeenAt={peerInfo.lastSeenAt} showLabel />
            </div>
            <div className='montserrat fw4 charcoal-muted mb2' style={{ fontSize: '.7rem' }}>{peerInfo.id}</div>
          </div>
        </div>
        <Message message={messages[messages.length - 1]} />
      </div>
    )
  }
}

function Message ({ message }) {
  if (!message) return null
  const { text, receivedAt } = message
  return (
    <div className='br3 bg-white pa3 pt4'>
      <div className='f3 montserrat mb3'>{text}</div>
      <div className='montserrat fw4 f7 charcoal-muted tr' title={new Date(receivedAt).toISOString()}>
        {fromNow(receivedAt, { and: true, suffix: true })}
      </div>
    </div>
  )
}

export default withOnUnloadUnmount(withChatterbox(PeerInfoPanel))
