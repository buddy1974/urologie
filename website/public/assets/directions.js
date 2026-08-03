var home = new google.maps.LatLng(latitude, longitude);
var title = title_marker; 
 
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {
 
  
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: zoom,
    center: home,
	
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  var control = document.getElementById('control');
  control.style.display = 'block';
 // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  
  var marker = new google.maps.Marker({
      position: home,
      map: map,
      title: title,
	  animation: google.maps.Animation.DROP
  });

  
  center = map.getCenter();
  
  google.maps.event.addDomListener(window, 'resize', function() {
	  map.setCenter(center);
	});
  
}

function calcRoute() {
 var start = document.getElementById('start').value;
  
  //var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: latitude+","+longitude,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
	else { alert('error');}
  });
}



google.maps.event.addDomListener(window, 'load', initialize);


