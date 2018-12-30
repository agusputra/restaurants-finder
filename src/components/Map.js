import React from 'react';
import GoogleMap from 'google-map-react';
import config from '../config'

const Marker = ({ title }) => (
  <div className="pin">
    <div className="card">
      <div className="card-body card-text">
        <strong>{title}</strong>
      </div>
    </div>
  </div>
)

export default ({ options, locations }) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMap
        bootstrapURLKeys={{ key: config.googleAPIKey }}
        defaultCenter={options.center}
        defaultZoom={options.zoom}>
        {
          locations.map(({ id, name, lat, lng }) =>
            <Marker key={id} lat={lat} lng={lng} title={name} />
          )
        }
      </GoogleMap>
    </div>
  );
}