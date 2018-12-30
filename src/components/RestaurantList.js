import React from 'react'
import RestaurantItem from './RestaurantItem'
import { loadRestaurants } from '../redux/actions'

export default ({ dispatch, restaurants: { loading, items, next } }) => {
  return (
    <div className="restaurant-list">
      {
        items.map(restaurant => (<RestaurantItem key={restaurant.id} restaurant={restaurant} />))
      }
      <div className="text-center mt-2">
        {
          next
            ?
            <button
              className="btn btn-secondary"
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