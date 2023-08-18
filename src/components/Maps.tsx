import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api'

const containerStyle = { 
  width: '400px',
  height: '400px'
}

const center = {
  lat: -3.745,
  lng: -38.528
}

const options = {
  position: center,
  pov: {
    heading: 0,
    pitch: 0
  },
  zoom: 1
}

function Maps(){
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <StreetViewPanorama options={{position: center, visible: true }}/>
    </GoogleMap>
  );
}

export default Maps;
