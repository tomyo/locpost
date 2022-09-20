import { getCurrentPosition } from './utils/geolocation.js'

const getLocationButton = document.querySelector('#get-location');

getLocationButton.addEventListener('click', async (e) => {
  if (!navigator.geolocation) {
    alert("Geolocation not available. Please choose another method.");
    return;
  }
  try {
    const coords = (await getCurrentPosition())?.coords;
    console.info("Got location:", coords);
    redirectToLocation(getLocation(coords))
  }
  catch (error) {
    alert(error.message);
  }
});

function getLocation(coords, { decimals = 2 } = {}) {
  const { latitude, longitude } = coords;
  const lat = latitude.toFixed(decimals);
  const lon = longitude.toFixed(decimals);
  return `${lat},${lon}`
}

function redirectToLocation(location) {
  const pathname = `./posts/`;
  const url = new URL(pathname, window.location);
  url.search = new URLSearchParams({ location });
  window.location.href = url;
}
