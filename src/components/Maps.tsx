import { Loader } from '@googlemaps/js-api-loader'
import { config } from 'dotenv'

config();


const loader = new Loader({
    apiKey: import.meta.env.GOOGLE_API_KEY,
    version: 'weekly',
    
})

loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });