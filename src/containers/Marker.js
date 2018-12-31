import React from 'react'
import { connect } from 'react-redux'
import {
  showRestaurantDetails,
  highlightRestaurant
} from '../redux/actions'

const Marker = ({ restaurant, application, dispatch }) => {
  let highlightClass = ''

  if (application.highlightRestaurant
    && (application.highlightRestaurant.id === restaurant.id)) {
    highlightClass = 'highlight'
  }

  return (
    <div
      className={`pin ${highlightClass}`}
      onClick={() => dispatch(showRestaurantDetails(restaurant))}
      onMouseEnter={() => dispatch(highlightRestaurant(restaurant))}>
      <div className="card">
        <div className="card-body card-text">
          <strong>{restaurant.name}</strong>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { application } = state

  return { application }
}

export default connect(mapStateToProps)(Marker)