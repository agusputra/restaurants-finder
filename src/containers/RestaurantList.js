import React from 'react'
import { connect } from 'react-redux'
import RestaurantItem from './RestaurantItem'
import { loadRestaurants } from '../redux/actions'

const RestaurantList = ({ restaurants: { loading, items, next }, dispatch }) => {
  return (
    <div className="restaurant-list pb-3">
      {
        items.map(restaurant => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant} />
        ))
      }
      <div className="text-center mt-2">
        {
          next
            ?
            <button
              className="btn btn-secondary btn-block btn-lg"
              disabled={loading}
              onClick={() => dispatch(loadRestaurants())}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
            :
            <p>~~~ End ~~~</p>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { restaurants } = state

  return { restaurants }
}

export default connect(mapStateToProps)(RestaurantList)