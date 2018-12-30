import config from '../config'
import utils from '../utils'

export const REQUEST_RESTAURANTS = 'REQUEST_RESTAURANTS'
export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS'
export const RECEIVE_RESTAURANTS_FROM_CACHE = 'RECEIVE_RESTAURANTS_FROM_CACHE'
export const CACHE_RESTAURANTS = 'CACHE_RESTAURANTS'

const root = 'https://developers.zomato.com/api/v2.1'
const opts = {
  headers: {
    Accept: 'application/json',
    'user-key': config.zomatoAPIKey
  }
}

const restaurantsSelector = state => state.restaurants.map(item => item.restaurant)

const requesRestaurants = () => ({ type: REQUEST_RESTAURANTS })
const receiveRestaurantsFromCache = () => ({ type: RECEIVE_RESTAURANTS_FROM_CACHE })
const receiveRestaurants = restaurants => ({ type: RECEIVE_RESTAURANTS, restaurants })
const cacheRestaurants = restaurants => ({ type: CACHE_RESTAURANTS, restaurants })

const fetchRestaurants = (page, dispatch, getState) => {
  const { query: { lat, lng } } = getState()
  const query = { start: (page - 1) * utils.perPageCount, count: utils.perPageCount, lat, lon: lng }

  dispatch(requesRestaurants())

  return fetch(utils.getUrl(root, 'search', query), opts)
    .then(r => r.json())
    .then(data => restaurantsSelector(data))
}

export const loadRestaurants = () => (dispatch, getState) => {
  const { restaurants: { loading, page, items } } = getState()

  if (loading) {
    return
  }

  if (items.length) {
    dispatch(receiveRestaurantsFromCache())
    fetchRestaurants(page + 1, dispatch, getState)
      .then(restaurants => {
        dispatch(cacheRestaurants(restaurants))
      })
  }
  else {
    fetchRestaurants(page, dispatch, getState)
      .then(restaurants => dispatch(receiveRestaurants(restaurants)))
      .then(() => fetchRestaurants(page + 1, dispatch, getState))
      .then(restaurants => dispatch(cacheRestaurants(restaurants)))
  }
}