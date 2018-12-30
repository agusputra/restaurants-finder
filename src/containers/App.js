import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { loadRestaurants } from '../redux/actions'
import RestaurantList from '../components/RestaurantList'
import Map from '../components/Map'
import utils from '../utils';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(loadRestaurants())
  }

  render() {
    const { dispatch, restaurants, query } = this.props

    const mapOptions = {
      center: {
        lat: query.lat,
        lng: query.lng
      },
      zoom: utils.mapZoom
    }

    const locations = restaurants.items.map(restaurant => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        lat: restaurant.location.latitude,
        lng: restaurant.location.longitude
      }
    })

    return (
      <React.Fragment>
        <div className="container">
          <Header />
          <div className="row mt-3">
            <div className="col-4">
              <RestaurantList restaurants={restaurants} dispatch={dispatch} />
              <p className="mt-3">Loaded {restaurants.items.length} items</p>
            </div>
            <div className="col-8">
              <Map options={mapOptions} locations={locations} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { restaurants, query } = state

  return { restaurants, query }
}

export default connect(mapStateToProps)(App)