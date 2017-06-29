var pos;
var map;
var marker;
var comment = document.getElementById("location");


function initMap(){
	pos = {
		lat: 28.5440072,
		lng: 77.2723736
	};
	map = new google.maps.Map(document.getElementById("map"),{zoom: 12, center: pos});
	marker = new google.maps.Marker({position: pos, map: map});
	getLocation();
}


function getLocation() {

	var geoOptions = {
		enableHighAccuracy: true,
		timeout: 10 * 1000
	}

	var geoSuccess = function(position) {
		pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		marker.setPosition(pos);
		map.setCenter(pos);

		comment.innerHTML = "Latitude : " + position.coords.latitude;

	};

	var geoError = function(error) {
		console.log('Error occurred. Error code: ' + error.code);
		comment.innerHTML = "Error occurred.";
		// error.code can be:
		//   0: unknown error
		//   1: permission denied
		//   2: position unavailable (error response from location provider)
		//   3: timed out
	};

	navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
}
