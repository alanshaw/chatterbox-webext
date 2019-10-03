import React, { useState } from 'react'

export default ({ peerInfo, onSend }) => {
  const [text, setText] = useState('')
  return (
    <form onSubmit={e => { e.preventDefault(); onSend(text) }}>
      <textarea onInput={e => setText(e.target.value)}>{text}</textarea>
      <button type='submit'>Send</button>
    </form>
  )
}
