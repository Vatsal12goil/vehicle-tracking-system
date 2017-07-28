var pos;
var map;
var marker;
var comment = document.getElementById("location");
var directionsService;
var directionsDisplay;

function call_route_fetch(){
	var id = document.getElementById("route_no").value;
    $.ajax({
      type: 'post',
      url: 'route_fetch',
      data: { 
        'id'            : id
      },
      success: function(data) {
		directionsService.route({
		origin: {
            'placeId': data.source
        },
		destination: {
            'placeId': data.destination
        },
		waypoints: data.waypoints,
		optimizeWaypoints: true,
		travelMode: 'DRIVING'
		}, function(response, status) {
	        if (status === 'OK') {
	            directionsDisplay.setDirections(response);
	        } else {
	            window.alert('Directions request failed due to ' + status);
	        }
	    });
      },
      error: function (error) {
        if(error.responseText == 'not_found')
            alert('The requested route number doesnot exist!');

      }
	});
}

function initMap(){
	pos = {
		lat: 28.5440072,
		lng: 77.2723736
	};
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	map = new google.maps.Map(document.getElementById("map"),{zoom: 12, center: pos});
	marker = new google.maps.Marker({position: pos, map: map});
	directionsDisplay.setMap(map);
	getLocation();
}


function getLocation() {

	var geoOptions = {
		enableHighAccuracy: true,
		maximumAge: 1.5 * 60 * 1000,
		timeout: 10 * 1000
	}

	var geoSuccess = function(position) {
		pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		marker.setPosition(pos);
		map.setCenter(pos);

		comment.innerHTML = "Running...";
		// add code to send over the location to the server.
		$.ajax({
			type: "POST",
			url: "/position",
			data: pos,
			success: function(data){
				console.log('Successful');
          },
		});
		console.log('sent the position to the server.');
	};

	var geoError = function(error) {
		console.log('Error occurred. Error code:' + error.code);
		comment.innerHTML = "Error occurred." + error.code;
		console.log(error.code);
		// error.code can be:
		//   0: unknown error
		//   1: permission denied
		//   2: position unavailable (error response from location provider)
		//   3: timed out
	};

	var wpid = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}
