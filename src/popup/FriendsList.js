/* eslint-env browser */

import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withOnUnloadUnmount } from './lib/OnUnloadUnmount'
import { withChatterbox } from './lib/Chatterbox'
import Badge from './Badge'

export class FriendsList extends Component {
  state = { friends: [] }

  async componentDidMount () {
    const controller = this.abortController = new AbortController()
    this.subscribeFriends(controller.signal)
  }

  componentWillUnmount () {
    this.abortController.abort()
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

  handleFriendClick = e => {
    const peerId = e.currentTarget.getAttribute('data-peer-id')
    this.props.onFriendClick(peerId)
  }

  render () {
    const { friends } = this.state
    return (
      <div className='pa3 bg-light-pink' style={{ minHeight: '100%' }}>
        <img src='images/stroke_heart.svg' width='35' className='mb2' title='Friends' />
        {friends.length ? (
          <ul className='list mv0 pl0'>
            {friends.map(({ id, name, lastMessage }) => (
              <li key={id} title={name ? `${name} (${id})` : id} className='mb2'>
                <button data-peer-id={id} className='dib bg-white-90 bw0 br1 pa1 hover-outline pointer relative outline-0' onClick={this.handleFriendClick} style={{ lineHeight: 0 }}>
                  <Identicon string={id} size={25} />
                  <Badge count={!lastMessage || lastMessage.readAt ? 0 : 1} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <button
          type='button'
          className='db montserrat fw6 f4 lh-title hot-pink w-100 bg-white-40 hover-bg-white-90 bw0 br1 pa1 hover-outline pointer outline-0'
          title='Add a friend'
          onClick={this.props.onAddFriendClick}
        >
        +
        </button>
      </div>
    )
  }
}

export default withOnUnloadUnmount(withChatterbox(FriendsList))
