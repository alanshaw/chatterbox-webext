import React from 'react'

export default ({ peers }) => {
  return (
    <div>
      <h1>Peers</h1>
      {peers.length ? (
        <ul>
          {peers.map(({ id, name }) => <li key={id}>{name || id}</li>)}
        </ul>
      ) : (
        <p>No peers seen in the last hour</p>
      )}
    </div>
  )
}
