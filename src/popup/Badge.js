import React from 'react'

const style = {
  width: '16px',
  height: '16px',
  lineHeight: '16px',
  fontWeight: 'bold',
  top: '-6px',
  right: '-6px'
}

export default ({ count }) => count ? (
  <div className='bg-red br-100 absolute white f7' style={style}>{count}</div>
) : null
