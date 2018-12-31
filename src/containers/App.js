import React from 'react'
import { connect } from 'react-redux'
import RestaurantList from '../containers/RestaurantList'
import Modal from '../components/Modal'
import Header from '../components/Header'
import RestaurantDetails from '../components/RestaurantDetails'
import Map from '../components/Map'
import config from '../config';
import {
  loadRestaurants,
  showRestaurantDetails
} from '../redux/actions'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(loadRestaurants())
  }

  render() {
    const { application, restaurants, query, dispatch } = this.props

    const mapOptions = {
      APIKey: config.googleAPIKey,
      center: {
        lat: query.lat,
        lng: query.lng
      },
      zoom: config.mapZoom
    }

    return (
      <React.Fragment>
        <Modal
          isOpen={application.restaurant}
          closeModal={() => dispatch(showRestaurantDetails())}
          body={<RestaurantDetails restaurant={application.restaurant} />} />
        <div className="container-fluid">
          <Header />
          <div className="slide py-3">
            <div className="slide-content">
              <div className="list pr-2">
                <RestaurantList />
                <p className="mt-3">Loaded {restaurants.items.length} items</p>
              </div>
              <div className="map pl-0">
                <Map
                  options={mapOptions}
                  restaurants={restaurants.items} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { application, restaurants, query } = state

  return { application, restaurants, query }
}

export default connect(mapStateToProps)(App)