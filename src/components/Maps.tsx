import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'



const containerStyle = { 
  width: '400px',
  height: '400px'
}

const center = {
  lat: -3.745,
  lng: -38.528
}

function Maps(){
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_KEY
  })

  const [ map, setMap ] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  console.log(import.meta.env)
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
    ></GoogleMap>
  ) : <></>
}

export default React.memo(Maps)