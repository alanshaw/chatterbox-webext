import React, { Component } from 'react'
import { withChatterbox } from './Chatterbox'

export class BroadcastMessagePanel extends Component {
  state = { text: '' }

  handleInput = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.messages.broadcast(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea onInput={this.handleInput}>{this.state.text}</textarea>
        <button type='submit'>Send</button>
      </form>
    )
  }
}

export default withChatterbox(BroadcastMessagePanel)
