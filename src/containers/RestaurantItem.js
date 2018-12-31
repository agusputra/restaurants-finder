import React from 'react'
import { connect } from 'react-redux'
import utils from '../utils'
import {
  showRestaurantDetails,
  highlightRestaurant
} from '../redux/actions'

const RestaurantItem = ({
  restaurant,
  restaurant: { name, thumb, location },
  application,
  dispatch
}) => {
  !thumb && (thumb = utils.noImageUrl)

  let highlightClass = ''

  if (application.highlightRestaurant
    && (application.highlightRestaurant.id === restaurant.id)) {
    highlightClass = 'highlight'
  }

  return (
    <div
      className={`restaurant-item ${highlightClass}`}
      onClick={() => dispatch(showRestaurantDetails(restaurant))}
      onMouseEnter={() => dispatch(highlightRestaurant(restaurant))}>
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

const mapStateToProps = state => {
  const { application } = state

  return { application }
}

export default connect(mapStateToProps)(RestaurantItem)