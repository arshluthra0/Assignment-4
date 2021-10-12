
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
 
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("lat"+position.coords.latitude)
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          if((window.localStorage.getItem("location_lat"))==''){
              alert("Welcome new user!")
          }
          else {
              lat1 =  window.localStorage.getItem("location_lat");
              lng1 =  window.localStorage.getItem("location_lng");
              lat2 =  position.coords.latitude;
              lng2 =  position.coords.longitude;
         //     calcDistance(lat1,lng1,lat2,lng2);
              alert("You have travelled: " +calcDistance(lat1,lng1,lat2,lng2) + " kms by far ");
          }
          window.localStorage.setItem("location_lat",position.coords.latitude);
          window.localStorage.setItem("location_lng",position.coords.longitude);
          window.localStorage.getItem("location_lat");
          console.log(window.localStorage.getItem("location_lat"))
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
function calcDistance(lat1, lon1, lat2, lon2){
    var toRadians = function(num) {
        return num * Math.PI / 180;
    }
    var R = 6371000; // radius of Earth in metres
    var a = toRadians(lat1);
    var b = toRadians(lat2);
    var c = toRadians(lat2-lat1);
    var d = toRadians(lon2-lon1);

    var a = Math.sin(c/2) * Math.sin(c/2) + Math.cos(a) * Math.cos(b) * Math.sin(d/2) * Math.sin(d/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return ( R * c );
}