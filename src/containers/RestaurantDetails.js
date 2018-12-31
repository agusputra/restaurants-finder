import React from 'react'
import { connect } from 'react-redux'
import { showRestaurantDetails } from '../redux/actions'

const RestaurantDetails = ({ restaurant, restaurant: { id, name }, dispatch }) => {
  if (!restaurant) {
    return null
  }

  return (
    <div className="card restaurant-details">
      <div className="card-header">
        {name}
        <button className="modal-close" onClick={() => dispatch(showRestaurantDetails())}>&times;</button>
      </div>
      <div className="card-body">
        <div className="card-text">
          <pre>{JSON.stringify(restaurant, null, 1)}</pre>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { application } = state

  return { application }
}

export default connect(mapStateToProps)(RestaurantDetails)