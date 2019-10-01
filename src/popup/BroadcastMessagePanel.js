import React, { useState } from 'react'

export default ({ peerInfo, onSend }) => {
  const [text, setText] = useState('')
  return (
    <form onSubmit={() => { onSend(text); return false }}>
      <textarea onInput={e => setText(e.target.value)}>{text}</textarea>
      <button type='submit'>Send</button>
    </form>
  )
}
