/* eslint-env browser */

import React, { Component } from 'react'
import { withChatterbox } from './Chatterbox'
import OverviewPage from './OverviewPage'
import SetNamePage from './SetNamePage'

export class App extends Component {
  state = { name: '' }

  async componentDidMount () {
    const { cbox } = this.props
    const { name } = await cbox.peer.get()
    if (name) this.setState({ name })
  }

  handleNameChange = async name => this.setState({ name })

  render () {
    const { name } = this.state
    return (
      <div style={{ width: 640, height: 320 }}>
        {name ? (
          <OverviewPage />
        ) : (
          <SetNamePage onChange={this.handleNameChange} />
        )}
      </div>
    )
  }
}

export default withChatterbox(App)
