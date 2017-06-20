var latlong;
function initMap(){
	var latlong = {lat: -28.5440072, lng: 77.2723736};
	var map = new google.maps.Map(document.getElementById("map"),{zoom: 12, center: latlong, mapTypeId: google.maps.MapTypeId.ROADMAP});
	var marker = new google.maps.Marker({position: latlong, map: map});
	getLocation();
}

var comment = document.getElementById("location-error");

function getLocation() {
    if (!!navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(plotPosition);
    }
    else { 
        comment.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function plotPosition(position) {
    comment.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    latlong = {lat: position.coords.latitude, lng: position.coords.longitude};
}