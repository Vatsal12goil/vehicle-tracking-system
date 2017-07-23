var pos;
var map;
var marker;
var comment = document.getElementById("location");


function initMap(){
	pos = {
		lat: 0,
		lng: 0
	};
	map = new google.maps.Map(document.getElementById("map"),{zoom: 12, center: pos});
	marker = new google.maps.Marker({position: pos, map: map});
	
	$.ajax({
		method: "GET",
		url: "update_clients",
		timeout: 10000,
		success: function(data){
			pos.lat = Number(data.lat);
			pos.lng = Number(data.lng);
			console.log(pos);
			marker.setPosition(pos);
			map.setCenter(pos);
			comment.innerHTML = "Latitude : " + pos.lat;
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
				console.log(pos);
				marker.setPosition(pos);
				map.setCenter(pos);
				comment.innerHTML = "Latitude : " + pos.lat;
			}
		});
	}, 2*60000);
}
