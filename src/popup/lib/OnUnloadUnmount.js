/* eslint-env browser */
import React, { Component } from 'react'

export function withOnUnloadUnmount (WrappedComponent) {
  return class extends Component {
    state = { mounted: false }

    componentDidMount () {
      this.setState({ mounted: true })
      self.addEventListener('unload', this.handleUnmount)
    }

    componentWillUnmount () {
      this.handleUnmount()
    }

    handleUnmount = () => {
      this.setState({ mounted: false })
      self.removeEventListener('unload', this.handleUnmount)
    }

    render () {
      return this.state.mounted ? <WrappedComponent {...this.props} /> : null
    }
  }
}
