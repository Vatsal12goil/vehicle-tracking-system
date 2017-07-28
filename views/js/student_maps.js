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
		lat: 0,
		lng: 0
	};
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	map = new google.maps.Map(document.getElementById("map"),{zoom: 12, center: pos});
	marker = new google.maps.Marker({position: pos, map: map});
	directionsDisplay.setMap(map);

	$.ajax({
		method: "GET",
		url: "update_clients",
		timeout: 10000,
		success: function(data){
			pos.lat = Number(data.lat);
			pos.lng = Number(data.lng);
			// console.log(pos);
			marker.setPosition(pos);
			map.setCenter(pos);
			if(pos.lat !== 0 && pos.long !== 0){
				comment.innerHTML = "Running...";
			}
			else{
				comment.innerHTML = "Driver not logged in !!!";
			}
		}
	});
	
	var requestLoop = setInterval(function(){
		$.ajax({
			method: "GET",
			url: "update_clients",
			timeout: 10000,
			success: function(data){
				pos.lat = Number(data.lat);
				pos.lng = Number(data.lng);
				// console.log(pos);
				marker.setPosition(pos);
				map.setCenter(pos);
				if(pos.lat !== 0 && pos.long !== 0){
					comment.innerHTML = "Running...";
				}
				else{
					comment.innerHTML = "Driver not logged in !!!";
				}
			}
		});
	}, 2*60000);
}
