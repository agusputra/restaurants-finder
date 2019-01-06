import { createSelector } from 'reselect'
import config from '../config'
import utils from '../utils'

const createAction = utils.createAction

export const requestRestaurants = createAction('REQUEST_RESTAURANTS')
export const receiveRestaurantsFromCache = createAction('RECEIVE_RESTAURANTS_FROM_CACHE')
export const receiveRestaurants = createAction('RECEIVE_RESTAURANTS', 'restaurants')
export const cacheRestaurants = createAction('CACHE_RESTAURANTS', 'restaurants')
export const setQuery = createAction('SET_QUERY', 'query')
export const showRestaurantDetails = createAction('SHOW_RESTAURANT_DETAILS', 'restaurant')
export const highlightRestaurant = createAction('HIGHLIGHT_RESTAURANT', 'restaurant')
export const setMapCenters = createAction("setMapCenters", 'lat', 'lng')

const restaurantsSelector = state => state.restaurants.map(item => item.restaurant)
const locationSelector = createSelector(restaurantsSelector, items => items[0] ? items[0].location : undefined)

const fetchRestaurants = async (page, dispatch, getState) => {
  const root = 'https://developers.zomato.com/api/v2.1'
  const opts = {
    headers: {
      Accept: 'application/json',
      'user-key': config.zomatoAPIKey
    }
  }

  let { query, restaurants: { nextPage } } = getState()

  if (!query.q && nextPage === 1) {
    query.lat = 28.6139
    query.lon = 77.2090

    dispatch(setQuery(query))
  }

  query = { start: (page - 1) * config.perPageCount, count: config.perPageCount, ...query }

  dispatch(requestRestaurants())

  const data = await fetch(utils.getUrl(root, 'search', query), opts).then(r => r.json())

  if (page === 1 && query.q) {
    const location = locationSelector(data)
    if (location) {
      dispatch(setMapCenters(location.latitude, location.longitude))
    }
  }
  else if (query.lat && query.lon) {
    dispatch(setMapCenters(query.lat, query.lon))
  }

  return restaurantsSelector(data)
}

export const loadRestaurants = () => async (dispatch, getState) => {
  let { restaurants: { loading, nextPage, items } } = getState()

  if (loading) {
    return
  }

  if (nextPage !== 1 && items.length) {
    dispatch(receiveRestaurantsFromCache())
    const restaurants = await fetchRestaurants(nextPage + 1, dispatch, getState)
    return dispatch(cacheRestaurants(restaurants))
  }
  else {
    let restaurants = await fetchRestaurants(nextPage, dispatch, getState)
    dispatch(receiveRestaurants(restaurants))
    restaurants = await fetchRestaurants(nextPage + 1, dispatch, getState)
    return dispatch(cacheRestaurants(restaurants))
  }
}

export const searchRestaurants = ({ keyword }) => (dispatch) => {
  dispatch(setQuery({ q: keyword }))
  return dispatch(loadRestaurants())
}