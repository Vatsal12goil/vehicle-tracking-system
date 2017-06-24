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
    if (!!navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    else {
        comment.innerHTML = "Geolocation is not supported by this browser.";;
    }
}

function getPosition(position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

	marker.setPosition(pos);
	map.setCenter(pos);

    comment.innerHTML = "Latitude : " + position.coords.latitude;
}