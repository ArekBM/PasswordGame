// import { GoogleMap, StreetViewPanorama } from '@react-google-maps/api'

// const containerStyle = { 
//   width: '400px',
//   height: '400px'
// }

// const center = {
//   lat: -3.745,
//   lng: -38.528
// }

// const options = {
//   position: center,
//   pov: {
//     heading: 0,
//     pitch: 0
//   },
//   zoom: 1
// }

// function Maps(){
//   return (
//     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//       <StreetViewPanorama options={{position: center, visible: true }}/>
//     </GoogleMap>
//   );
// }

// export default Maps;




import {APIProvider, Map} from '@vis.gl/react-google-maps';

const Maps = () => (
  <APIProvider apiKey={import.meta.env.VITE_REACT_APP_TEST_API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default Maps
