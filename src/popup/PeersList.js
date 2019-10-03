import React from 'react'
import Identicon from 'react-identicons'

export default ({ peers }) => {
  return (
    <div>
      <h1>Peers</h1>
      {peers.length ? (
        <ul>
          {peers.map(({ id, name }) => {
            return (
              <li key={id} title={name ? `${name} (${id})` : id}>
                <Identicon string={id} size={30} />
              </li>
            )
          })}
        </ul>
      ) : (
        <p>No peers seen in the last hour</p>
      )}
    </div>
  )
}
