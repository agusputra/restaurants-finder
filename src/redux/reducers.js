import { combineReducers } from 'redux'
import * as acts from './actions'

const restaurants = (state, action) => {
  state = state === undefined
    ? { loading: false, nextPage: 1, items: [], cache: [], next: true }
    : state

  switch (action.type) {
    case acts.requestRestaurants.type:
      return {
        ...state,
        loading: true
      }
    case acts.receiveRestaurantsFromCache.type:
      return {
        ...state,
        nextPage: state.nextPage + 1,
        items: state.items.concat(state.cache),
        cache: [],
      }
    case acts.receiveRestaurants.type:
      return {
        ...state,
        loading: false,
        nextPage: state.nextPage + 1,
        items: action.restaurants
      }
    case acts.cacheRestaurants.type:
      return {
        ...state,
        loading: false,
        cache: action.restaurants,
        next: action.restaurants.length
      }
    case acts.setQuery.type:
      return {
        ...state,
        nextPage: 1,
        items: [],
        cache: []
      }
    default:
      return state
  }
}

const application = (state = { mapCenters: {} }, action) => {
  switch (action.type) {
    case acts.showRestaurantDetails.type:
      return {
        ...state,
        restaurant: action.restaurant ? { ...action.restaurant } : undefined
      }
    case acts.highlightRestaurant.type:
      return {
        ...state,
        highlightRestaurant: action.restaurant ? { ...action.restaurant } : undefined
      }
    case acts.setMapCenters.type:
      return {
        ...state,
        mapCenters: {
          lat: parseFloat(action.lat),
          lng: parseFloat(action.lng)
        }
      }
    default:
      return state
  }
}

const query = (state = {}, action) => {
  switch (action.type) {
    case acts.setQuery.type:
      return action.query
    default:
      return state
  }
}

export default combineReducers({ application, restaurants, query })