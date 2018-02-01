
const targetPlace = {
  lat: 35.648202,
  lng: 139.71149,
};

const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

const startInput = document.getElementById('start');

async function calculateAndDisplayRoute(origin, destination, travelMode) {
  return new Promise((resolve, reject) => {
    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode[travelMode]
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        resolve(response);
      } else {
        window.alert('Directions request failed due to ' + status);
        reject();
      }
    });
  });
}

async function getNearestStation(location, callback) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location,
      radius: 500,
      types: ['train_station', 'subway_station']
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results[0]);
      } else {
        alert("cannot get nearest station.")
        reject();
      }
    });
  });
}

async function getGeocode(address) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": address }, (results, status) => {
      if(status === "OK") {
        resolve(results[0]);
      } else {
        alert("cannot get geocode.")
        reject();
      }
    });
  });
}

async function getCurrentGeocode() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });  
      },
	  	() => {},
    );
  });
}

async function searchRoute() {
  console.log("--- search start ---");

  /*
  const startKeyword = startInput.value;
  console.log("start keyword:");
  console.log(startKeyword)
  
  const startGeocode = await getGeocode(startKeyword);
  console.log("start geocode:");
  console.log(startGeocode)

  const startLocation = startGeocode.geometry.location;
  console.log(startLocation)

  const nearestStation = await getNearestStation(startGeocode.geometry.location);
  console.log("nearest station:");
  console.log(nearestStation)
  */
  
  const startLocation = await getCurrentGeocode();
  console.log(startLocation)

  const nearestStation = await getNearestStation(startLocation);
  console.log("nearest station:");
  console.log(nearestStation)
  
  calculateAndDisplayRoute(startLocation, nearestStation.geometry.location, "WALKING");
  
  console.log("--- search end ---");
}

const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: targetPlace,
});
directionsDisplay.setMap(map);

const onChangeHandler = () => {
  searchRoute();
};
startInput.addEventListener('change', onChangeHandler);


