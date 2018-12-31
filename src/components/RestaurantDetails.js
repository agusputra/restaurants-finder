import React from 'react'

export default ({ restaurant, restaurant: { id, name } }) => {
  if (!restaurant) {
    return null
  }

  return (
    <div className="card">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <div className="card-text">
          <pre>{JSON.stringify(restaurant, null, 1)}</pre>
        </div>
      </div>
    </div>
  )
}