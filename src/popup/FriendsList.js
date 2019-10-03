/* eslint-env browser */

import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withChatterbox } from './Chatterbox'

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
      <div>
        <h1>Friends</h1>
        {friends.length ? (
          <ul>
            {friends.map(({ id, name }) => {
              return (
                <li key={id} title={name ? `${name} (${id})` : id}>
                  <button data-peer-id={id} className='pointer' onClick={this.handleFriendClick}>
                    <Identicon string={id} size={30} />
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No friends yet</p>
        )}
      </div>
    )
  }
}

export default withChatterbox(FriendsList)
