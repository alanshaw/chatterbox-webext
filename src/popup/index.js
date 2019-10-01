import React from 'react'
import ReactDOM from 'react-dom'
import browser from 'webextension-polyfill'
import App from './App'

async function main () {
  const { cbox } = await browser.runtime.getBackgroundPage()
  ReactDOM.render(<App cbox={cbox} />, document.getElementById('root'))
}

main()
