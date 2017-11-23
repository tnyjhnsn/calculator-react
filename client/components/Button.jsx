import React from 'react'

const Button = ({ label, type, handleClick, isSign }) => {
  const className = "my-button " + type
  return (
    <button
      className={className}
      onClick={handleClick}
      id={isSign}
      value={label}>
        {label}
    </button>
  )
}

export default Button