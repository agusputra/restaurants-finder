import React from 'react'
import utils from '../utils'

export default ({ restaurant: { name, thumb, location } }) => {
  !thumb && (thumb = utils.noImageUrl)

  return (
    <div className="restaurant-item">
      <div className="media">
        <img src={thumb} className="mr-3" alt={name} style={{ width: 64 }} />
        <div className="media-body">
          <h5 className="mt-0">{name}</h5>
          <p>{location.address}</p>
        </div>
      </div>
    </div>
  )
}