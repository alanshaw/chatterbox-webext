import React, { Component } from 'react'

class SetNamePage extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
  }

  async componentDidMount () {
    const { cbox } = this.props
    const peerInfo = await cbox.peer.get()

    if (peerInfo && peerInfo.name) {
      this.setState({ name: peerInfo.name })
    }
  }

  async handleSubmit () {
    const { cbox } = this.props
    await cbox.peer.set({ name: this.state.name })
    this.props.onChanged()
  }

  render () {
    const { name } = this.state
    return (
      <form onSubmit={() => { this.handleSubmit(); return false }}>
        <label htmlFor='name'>Name</label>
        <input onInput={e => this.setState({ name: e.target.value })} value={name} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default SetNamePage
