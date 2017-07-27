var map;
waypointsPlaceId = [];
waypointsPlaceId.forEach(function(waypointsPlaceId) {
        waypointsPlaceId = null;
    }

);
var waypointsInput = [];
var waypoints = 0;
var waypointsAutocomplete = [];
var a;

function save_route(){
    var routeno = getElementById("id").value;
    $.ajax({
      type: 'post',
      url: 'save_route',
      data: { 
        'id'            : routeno, 
        'source'        : a.originPlaceId,
        'destination'   : a.destinationPlaceId,
        'waypoints'     : waypointsPlaceId.toString()
      },
      success: function (response) {
        alert(response.status);
      },
      error: function () {
        alert("error");
      }
    });
}

function add() {
    AutocompleteDirectionsHandler.prototype.addWaypoint(map);
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {
            lat: 28.5440072,
            lng: 77.2723736
        },
        zoom: 13
    });

    new AutocompleteDirectionsHandler(map);
}

function AutocompleteDirectionsHandler(map) {
    a = this;
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    waypointsPlaceId = [];
    waypointsPlaceId.forEach(function(waypointsPlaceId) {
        waypointsPlaceId = null;
    });
    this.travelMode = 'DRIVING';
    var originInput = document.getElementById('source');
    var destinationInput = document.getElementById('destination');
    waypointsInput = [];
    waypoints = 0;

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(originInput, {
        placeIdOnly: true
    });
    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, {
        placeIdOnly: true
    });
    waypointsAutocomplete = [];

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
}

AutocompleteDirectionsHandler.prototype.addWaypoint = function() {
    var me = this;
    waypoints = waypoints + 1;

    var element = document.createElement("input");

    element.setAttribute("type", "text");
    element.setAttribute("placeholder", "Waypoint " + waypoints.toString());
    element.setAttribute("name", "waypt" + waypoints.toString());
    element.setAttribute("id", "waypt" + waypoints.toString());
    element.setAttribute("class", "form-control");

    var text_field = document.getElementById("waypoints");
    text_field.appendChild(element);

    waypointsInput.push(element);
    waypointsAutocomplete.push(new google.maps.places.Autocomplete(waypointsInput[waypoints - 1], {
        placeIdOnly: true
    }));
    this.setupPlaceChangedListener(waypointsAutocomplete[waypoints - 1], waypoints.toString());
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;

    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else
        if (mode === 'DEST') {
            me.destinationPlaceId = place.place_id;
        } else {
            console.log(place.place_id);
            waypointsPlaceId.push({
                location: {
                    placeId: place.place_id
                },
                stopover: true
            });
            a.route();
        }
        me.route();
    });

};

AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route({
        origin: {
            'placeId': this.originPlaceId
        },
        destination: {
            'placeId': this.destinationPlaceId
        },
        waypoints: waypointsPlaceId,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};