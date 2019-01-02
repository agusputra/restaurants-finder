import React from 'react'
import GoogleMap from 'google-map-react'
import Marker from '../containers/Marker'

export default ({ options, restaurants }) => {
  return (
    <div className="map-container">
      <GoogleMap
        bootstrapURLKeys={{ key: options.APIKey }}
        center={options.center}
        zoom={options.zoom}>
        {
          restaurants.map(restaurant =>
            <Marker
              key={restaurant.id}
              lat={restaurant.location.latitude}
              lng={restaurant.location.longitude}
              restaurant={restaurant} />
          )
        }
      </GoogleMap>
    </div>
  )
}