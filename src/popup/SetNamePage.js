import React, { Component } from 'react'
import { withChatterbox } from './Chatterbox'

export class SetNamePage extends Component {
  state = { name: '' }

  async componentDidMount () {
    const { cbox } = this.props
    const peerInfo = await cbox.peer.get()

    if (peerInfo.name) {
      this.setState({ name: peerInfo.name })
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { cbox } = this.props
    await cbox.peer.set({ name: this.state.name })
    this.props.onChange(this.state.name)
  }

  render () {
    const { name } = this.state
    return (
      <div className='flex items-center justify-center h-100'>
        <div className='tc'>
          <div className='mb3'>
            <img className='pr3 v-mid' src='images/icon.svg' style={{ width: '50px' }} />
            <span className='montserrat fw6 f3 charcoal ttu v-mid'>Chatterbox</span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              className='input-reset charcoal ba b--black-20 br1 pa2 mb2 db w-75 center focus-outline'
              onInput={e => this.setState({ name: e.target.value })}
              value={name}
              placeholder='Your name'
            />
            <button
              type='submit'
              className={`transition-all sans-serif dib fw5 lh-copy bn br1 pa2 pointer focus-outline white bg-${name ? 'green' : 'gray'} white ma2`}
              style={{ minWidth: '140px' }}
              disabled={!name}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withChatterbox(SetNamePage)
