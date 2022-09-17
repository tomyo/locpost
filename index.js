import { getCurrentPosition } from './utils/geolocation.js'

const getLocationButton = document.querySelector('#get-location');

getLocationButton.addEventListener('click', async (e) => {
  if (!navigator.geolocation) {
    alert("Geolocation not available. Please choose another method.");
    return;
  }
  try {
    const position = await getCurrentPosition();
    console.info("Got location:", position.coords)
    //TODO: go to messages page and display messages
  }
  catch (error) {
    alert(error.message);
  }
});