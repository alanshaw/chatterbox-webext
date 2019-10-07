import React from 'react'
import ReactDOM from 'react-dom'
import Chatterbox, { Provider } from './lib/Chatterbox'
import App from './App'

async function main () {
  ReactDOM.render(
    <Provider cbox={await Chatterbox()}>
      <App />
    </Provider>, document.getElementById('root'))
}

main()
