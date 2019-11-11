import React, { Component } from 'react'

const FIVE_MINS = 5 * 60 * 1000

export default class StatusIndicator extends Component {
  state = { now: Date.now() }

  componentDidMount () {
    this._intervalId = setInterval(() => this.setState({ now: Date.now() }), 1000)
  }

  componentWillUnmount () {
    clearInterval(this._intervalId)
  }

  render () {
    const { lastSeenAt, showLabel } = this.props
    const { now } = this.state
    const status = lastSeenAt && lastSeenAt > now - FIVE_MINS ? 'online' : 'offline'

    return (
      <fragment>
        <span
          className={`dib bg-${status === 'online' ? 'green' : 'red'} br-100`}
          style={{ width: 8, height: 8 }}
        />
        {showLabel ? <span className='ml1'>{status}</span> : null}
      </fragment>
    )
  }
}
