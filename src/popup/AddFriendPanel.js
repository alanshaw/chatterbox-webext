import React, { Component } from 'react'
import { withChatterbox } from './lib/Chatterbox'

export class AddFriendPanel extends Component {
  state = { peerId: '', errorMessage: '' }

  handleSubmit = async e => {
    e.preventDefault()
    const { cbox } = this.props
    try {
      await cbox.friends.add(this.state.peerId)
      this.props.onAdd(this.state.peerId)
    } catch (err) {
      console.error(err)
      this.setState({ errorMessage: err.message })
    }
  }

  render () {
    const { peerId, errorMessage } = this.state
    return (
      <div className='pa3 h-100'>
        <div class='fr'>
          <button onClick={this.props.onClose} className='transition-all f3 bg-transparent bw0 pa0 black-20 hover-black-90 pointer lh-solid'>ⓧ</button>
        </div>
        <div className='flex items-center justify-center h-100'>
          <div className='tc w-100'>
            <div className='mb3'>
              <div>
                <img src='images/stroke_heart.svg' width='50' className='mb2' title='Add Friend' />
              </div>
              <span className='montserrat fw6 f3 charcoal'>Add a Friend</span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input
                className='input-reset charcoal ba b--black-20 br1 pa2 mb2 db w-75 center focus-outline'
                onInput={e => this.setState({ peerId: e.target.value, errorMessage: '' })}
                value={peerId}
                placeholder='Enter peer ID, e.g. QmdQB1xms8y4kU5ma4zWjgvoQAgToaUAB94A1pC65wHynR'
              />
              {errorMessage ? (
                <div className='montserrat fw4 f6 red tc'>⚠️ {errorMessage}</div>
              ) : null}
              <button
                type='submit'
                className={`transition-all sans-serif dib fw5 lh-copy bn br1 pa2 pointer focus-outline white bg-${peerId ? 'green' : 'gray'} white ma2`}
                style={{ minWidth: '140px' }}
                disabled={!peerId}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withChatterbox(AddFriendPanel)
