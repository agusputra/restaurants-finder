import { combineReducers } from 'redux'
import {
  REQUEST_RESTAURANTS,
  RECEIVE_RESTAURANTS,
  RECEIVE_RESTAURANTS_FROM_CACHE,
  CACHE_RESTAURANTS
} from './actions'

const restaurants = (state, action) => {
  state = state === undefined
    ? { loding: false, page: 1, items: [], cache: [], next: true }
    : state

  switch (action.type) {
    case REQUEST_RESTAURANTS:
      return {
        ...state,
        loading: true
      }
    case RECEIVE_RESTAURANTS_FROM_CACHE:
      return {
        ...state,
        page: state.page + 1,
        items: state.items.concat(state.cache),
        cache: [],
      }
    case RECEIVE_RESTAURANTS:
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        items: action.restaurants
      }
    case CACHE_RESTAURANTS:
      return {
        ...state,
        loading: false,
        cache: action.restaurants,
        next: action.restaurants.length
      }
    default:
      return state
  }
}

const query = (state, action) => {
  state = state === undefined
    ? { lat: 28.6139, lng: 77.2090 }
    : state

  return state
}

export default combineReducers({ restaurants, query })