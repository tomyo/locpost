export async function getCurrentPosition({
  timeout = 5 * 1000,  // x * seconds t wait until if not response is given is considered error
  maximumAge = 10 * 1000, // How long ago captured locations is valid still to use
  enableHighAccuracy = false,
} = {}) {
  // Returns position object (https://developer.mozilla.org/es/docs/Web/API/GeolocationPosition)

  return new Promise((resolve, reject) => {
    console.info("Asking for current position.");
    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout, maximumAge, enableHighAccuracy });
  });
}

export async function isPermitionGranted() {
  let result = false;
  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });
    result = permission.state === "granted";
  } catch (error) {
    result = false;
    console.error(error);
  } finally {
    return result;
  }
}
