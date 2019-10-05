import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withChatterbox } from './Chatterbox'

export class BroadcastMessagePanel extends Component {
  state = { peerInfo: null, text: '' }

  async componentDidMount () {
    const { cbox } = this.props
    this.setState({ peerInfo: await cbox.peer.get() })
  }

  handleInput = e => this.setState({ text: e.target.value })

  handleSubmit = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.messages.broadcast(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    const { peerInfo } = this.state
    if (!peerInfo) return null

    return (
      <div className='flex items-center justify-center h-100'>
        <div class='tc'>
          <div className='dib bg-white-90 br1 pa3 mb2 hover-outline' style={{ lineHeight: 0 }}>
            <Identicon string={peerInfo.id} size={75} />
          </div>
          <div className='montserrat fw6 f4 charcoal ttu v-mid mb3'>{peerInfo.name} <span className='fw4'>says:</span></div>
          <form onSubmit={this.handleSubmit}>
            <textarea onInput={this.handleInput} value={this.state.text} />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withChatterbox(BroadcastMessagePanel)
