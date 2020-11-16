// Geovisualization - Assignment 1
// A leaflet interactive map for new students
// author: Niklas Jaggy
// Mnr: ...

//creating the map; defining the location in the center of the map (geographic coords) and the zoom level. These are properties of the leaflet map object
//the map window has been given the id 'map' in the .html file
var map = L.map('map', {
	center: [47.8, 13.05],
	zoom: 14
});

//adding two base maps, one goes on the map
var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var world_imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// for using the two base maps in the layer control, I defined a baseMaps variable
var baseMaps = {
    "OSM": CartoDB_VoyagerNoLabels,
    "Satellite": world_imagery
};
CartoDB_VoyagerNoLabels.addTo(map);
//
//---- Part 2: Adding a scale bar
L.control.scale({
	maxWidth:200,
	metrix:true,
	imperial:false,
	position:'bottomleft'
}).addTo(map);

//----Defining icon styles
var icon_coffe = L.icon({
	iconUrl: 'css/images/cafe.png',
	iconSize: [20, 20]
});

var icon_sportpoints = L.icon({
	iconUrl: 'css/images/marker_sport_white.png',
	iconSize: [18, 18]
});

var unistyle = {
	color: "#1C1C1C",
	opacity: 1,
	weight: 1,
	fillColor: "#A4A4A4",
	fillOpacity: 0.5
};

var sportstyle = {
	color:"green",
	opacity: 1, 
	weight: 1,
	fillColor: "green",
	fillOpacity: 0.5
};

//---- Declaring variables for Geojson polygon
var sport_poly;
var university;
//---- Defining functions
//--zooming towards clicked feature
function zoomToFeature(e) {
	map.flyToBounds(e.target.getBounds(), {
		animate: true,
		duration: 1.5});
	//map.fitBounds(e.target.getBounds());
}
//--changing color when mouse is over object
function highlightFeature(e) {
	var activefeature = e.target;

	activefeature.setStyle({
		weight: 3,
		color: 'red',
		fillColor: 'red',
		fillOpacity: 0.7
	});
	if (!L.Browser.ie && !L.Browser.opera) {
		activefeature.bringToFront();
	}
}

//function to reset highlight back to normal
function resetHighlight(e) {
	sport_poly.resetStyle(e.target);
	/*if (e.target == sport_poly) {
		sport_poly.resetStyle(e.target);
	} else {
		university.resetStyle(e.target);
	}*/
}
function resetHighlight_uni(e) {
	university.resetStyle(e.target);
}

//overall interactive function with listeners to call methods
function interactiveFunction(feature, layer) {
	layer.bindTooltip("Sport facility"),
	layer.bindPopup("Sport offered here:" + "<br>" + feature.properties.sport),
	layer.on('contextmenu', zoomToFeature);
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
	});
}

function interactiveFunction_uni(feature, layer) {
	layer.bindTooltip("Uni Salzburg"),
	layer.bindPopup("University Salzburg" + "<br>" + "Amenity: " +feature.properties.name),
	layer.on('contextmenu', zoomToFeature);
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight_uni,
	});
}
//
//---- Adding features from the geojson file 
//
//---- Adding point features to map
var cafe= L.geoJson(cafe, {
	pointToLayer: function(feature, latlng) {
	return L.marker(latlng, {icon: icon_coffe, title: "Café"})
	},
	onEachFeature: function(feature, marker) {
		marker.bindPopup("Welcome to" + "<br>" + "'" + feature.properties.name + "'!");
	}
});

var sport_points = L.geoJson(sport_points, {
	pointToLayer: function(features, latlng) {
	return L.marker(latlng, {icon: icon_sportpoints, title: "Sport Facility"})},
	onEachFeature: function(feature, marker) {
		marker.bindPopup("Sport offered here:" + "<br>" + feature.properties.sport);
	}
});

//---- Adding polygon features to map
university = L.geoJson(amenity_university, {style: unistyle, 
	onEachFeature: function(feature, layer) {
		layer.bindTooltip("Uni Salzburg"),
		layer.bindPopup("University Salzburg" + "<br>" + "Amenity: " +feature.properties.name),
		layer.on('click', zoomToFeature);
	}
});

university= L.geoJson(amenity_university, {style: unistyle,
	onEachFeature: interactiveFunction_uni
	}
);
sport_poly= L.geoJson(sport_polygons, {style: sportstyle,
	onEachFeature: interactiveFunction
	}
);
//----adding layers to map
sport_points.addTo(map);
cafe.addTo(map);
university.addTo(map);
sport_poly.addTo(map);



//the variable features lists layers that I want to control with the layer control
var features = {
	"Café": cafe,
	"University": university,
	"Sport": sport_points,
	"Sport areas": sport_poly
};


//----Adding layer control to the map
L.control.layers(baseMaps, features).addTo(map);