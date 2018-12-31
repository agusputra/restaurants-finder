import React from 'react'
import GoogleMap from 'google-map-react'
import Marker from '../containers/Marker'

export default ({ options, restaurants }) => {
  return (
    <div className="map-container">
      <GoogleMap
        bootstrapURLKeys={{ key: options.APIKey }}
        defaultCenter={options.center}
        defaultZoom={options.zoom}>
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
  );
}