import React from 'react'
import { connect } from 'react-redux'
import RestaurantList from '../containers/RestaurantList'
import RestaurantDetails from '../containers/RestaurantDetails'
import Modal from '../components/Modal'
import Header from '../components/Header'
import Map from '../components/Map'
import config from '../config'
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
    const { application, restaurants, dispatch } = this.props

    const mapOptions = {
      APIKey: config.googleAPIKey,
      center: {
        lat: application.mapCenters.lat,
        lng: application.mapCenters.lng
      },
      zoom: config.mapZoom
    }

    const renderMap = application.mapCenters.lat && application.mapCenters.lng

    return (
      <React.Fragment>
        <Modal
          isOpen={application.restaurant}
          closeModal={() => dispatch(showRestaurantDetails())}
          body={<RestaurantDetails restaurant={application.restaurant} />} />
        <div className="container-fluid">
          <Header />
          <div className="slide pb-3">
            <div className="slide-content">
              <div className="list pr-2">
                <RestaurantList />
                <p className="mt-3">Loaded {restaurants.items.length} items</p>
              </div>
              <div className="map pl-0">
                {
                  renderMap
                  && <Map
                    options={mapOptions}
                    restaurants={restaurants.items} />
                }
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