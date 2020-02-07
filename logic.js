// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.comic",
  accessToken: "pk.eyJ1IjoiZXh0cmFzYXVjZW9udG9wIiwiYSI6ImNrNjZ5YzZwNzFxeGwzbHIwdmpoMzZybTIifQ.u2xNzhNPAj4xWffdSRjwmQ"
}).addTo(myMap);


// Create the markers with this function
function createFeatures(data) {
  
  // Loop through the earthquake data array
  data.forEach((quake) => {
    // Get the lat and lon
    var location = quake.geometry.coordinates
    location.pop()
    location = location.reverse()
    
    // Get the magnitude
    var mag = quake.properties.mag

    // Get the description of the locaiton
    var place = quake.properties.place

    // Set the color for the marker based on the magnitude
    if (mag < 0.5) {
      color = "white"
    } else if (mag < 1 ) {
      color = "yellow"
    } else if (mag < 2) {
      color = "orange"
    } else if (mag < 4) {
      color = "red"
    } else {
      color = "black"
    }

    // Make the marker
    L.circleMarker(location, {radius: mag * 10, fillColor: color, color: color}).bindPopup("<h2>Magnitude: " + mag + "</h2><hr><h4>Location: " + place + "</h4>").addTo(myMap)
  })

}