import React from 'react'

const Screen = ({ type, value }) => {
  return (
    <div className={type}>{value}</div>
  )
}

export default Screen