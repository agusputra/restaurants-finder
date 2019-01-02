
import { createStore, applyMiddleware } from 'redux'
import * as acts from './redux/actions'
import reducers from './redux/reducers'
import thunk from 'redux-thunk'

describe('redux', () => {
  let store

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => (
        {
          restaurants: [
            { restaurant: { location: { latitude: 1, longitude: 2 } } },
            { restaurant: { location: { latitude: 3, longitude: 4 } } }
          ]
        }
      )
    }))

    store = createStore(reducers, applyMiddleware(thunk))
  })

  it('load restorants', async () => {
    const { dispatch, getState } = store

    await dispatch(acts.loadRestaurants())

    const { application, query, restaurants } = getState()

    expect(restaurants.nextPage).toBe(2)
    expect(restaurants.items.length).toBe(2)
    expect(application.mapCenters.lat).toBe(query.lat)
  })

  it('search restorants', async () => {
    const { dispatch, getState } = store

    const keyword = 'nasi goreng'

    await dispatch(acts.searchRestaurants({ keyword }))

    const { application, query, restaurants } = getState()

    expect(query).toEqual({ q: keyword })
    expect(restaurants.nextPage).toBe(2)
    expect(restaurants.items.length).toBe(2)
    expect(query.lat).toBeUndefined()
    expect(application.mapCenters.lat).toBe(restaurants.items[0].location.latitude)
  })
})