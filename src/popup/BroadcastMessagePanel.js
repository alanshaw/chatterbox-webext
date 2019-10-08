import React, { Component } from 'react'
import Identicon from 'react-identicons'
import { withChatterbox } from './lib/Chatterbox'

export class BroadcastMessagePanel extends Component {
  state = { peerInfo: null, text: '' }

  async componentDidMount () {
    const { cbox } = this.props
    this.setState({ peerInfo: await cbox.peer.get() })
  }

  handleInput = e => this.setState({ text: e.target.value })

  handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e)
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.messages.broadcast(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    const { peerInfo, text } = this.state
    if (!peerInfo) return null

    return (
      <div className='flex items-center justify-center h-100'>
        <div class='tc'>
          <div className='dib bg-white-90 br1 pa3 mb2 hover-outline' style={{ lineHeight: 0 }}>
            <Identicon string={peerInfo.id} size={75} />
          </div>
          <div className='montserrat fw6 f4 charcoal ttu mb3'>{peerInfo.name} <span className='fw4'>says:</span></div>
          <form onSubmit={this.handleSubmit} className='mb3'>
            <textarea onInput={this.handleInput} value={text} className='input-reset charcoal ba b--black-20 br3 pa2 mb2 focus-outline v-btm' onKeyDown={this.handleKeyDown} />
            <button type='submit' className={`transition-all sans-serif dib fw5 lh-copy bn br1 pv2 ph3 pointer focus-outline white bg-${text ? 'green' : 'gray'} white ma2`} disabled={!text.trim()}>Send</button>
          </form>
          <div className='montserrat fw4 f7 charcoal'>
            <span className='charcoal-muted mr1'>My Peer ID:</span>
            {peerInfo.id}
          </div>
        </div>
      </div>
    )
  }
}

export default withChatterbox(BroadcastMessagePanel)
