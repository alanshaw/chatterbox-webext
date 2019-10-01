import React from 'react'

export default ({ friends }) => {
  return (
    <div>
      <h1>Friends</h1>
      {friends.length ? (
        <ul>
          {friends.map(({ id, name }) => <li key={id}>{name || id}</li>)}
        </ul>
      ) : (
        <p>No friends yet</p>
      )}
    </div>
  )
}
