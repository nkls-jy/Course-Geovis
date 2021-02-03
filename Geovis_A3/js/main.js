// Geovisualization - Assignment 3
// The New Silk Road
// author: Niklas Jaggy
// Mnr: 12033861

var map = L.map('map');
map.setView([0, 0], 2);

//adding two base maps, one goes on the map
var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
var Stamen_TonerLines = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
var Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});
var Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

Esri_WorldPhysical.addTo(map).setZIndex(1);

// for using the two base maps in the layer control, I defined a baseMaps variable
var baseMaps = {
    "positron": positron,
    "CartoDB-OSM": CartoDB_VoyagerNoLabels,
    "World Physical": Esri_WorldPhysical,
    "Abstract": Stamen_Watercolor
};
var base_addons = {
    "Country Lines": Stamen_TonerLines,
    "Labels": Stamen_TonerLabels
};

//define markers and styles
var simplemarker = L.icon({
	iconUrl: 'css/images/simplemarker.png',
	iconSize: [20, 20]
});
var harbour = L.icon({
    iconUrl: 'css/images/anchor-solid.svg',
    iconSize: [20, 20]
});
var landmarker = L.icon({
    iconUrl: 'css/images/container_transparent.png',
    iconSize: [20, 20]
});
var histmarker = L.icon({
    iconUrl: 'css/images/camel_transparent.png',
    iconSize: [20, 20]
});
var histstyle = {
    color: "#514400",
    weight: 3,
    dashArray: "5 10"
};
var seastyle = {
    color: "#001c54",
    weight: 2.5,
    snakingSpeed: 50
};
var landstyle = {
    color: "#a82743",
    weight: 4, 
    dashArray: "1 8"
};

//
// Land Silk Road
// set variable for the snake stops

/*
var landroutenew = L.layerGroup([]);
for (var j=0, k=1, len = lroute.length; j < len ; j++, k++) {
    var startpoint = L.latLng(lroute[j]);
    var endpoint = L.latLng(lroute[k]);
    var nextpolyline = L.polyline(startpoint, endpoint);
    latlngsnew.addLayer(L.marker(L.latLng(lroute[j])));
    latlngsnew.addLayer(nextpolyline);
    latlngsnew.addLayer(new L.polyline([new L.LatLng(lroute[j][0], lroute[j][1]), new L.LatLng(lroute[k][0], lroute[k][1])]));
}

for (var j=0, k=1, len = lroute.length; j < len ; j++, k++) {
    latlngsnew.addLayer(new L.marker(L.latLng(lroute[j][0], lroute[j][1])));
    latlngsnew.addLayer(new L.polyline([[L.latLng(lroute[j])]], [[L.latLng(lroute[[k]])]]));
    k++;
}

for (var j=0, k=1, latlngs = [], len =lroute.length; k < len; j++, k++) {
    latlngs.push(new L.LatLng(lroute[k][0], lroute[k][1]));
    var j = j+1;
    latlngs.push(new L.LatLng(lroute[j][0], lroute[j][1]));
    var mark = latlngs[k];
    var start = latlngs[0];
    var end = latlngs[1];
    landroutenew.addLayer(new L.marker(mark));
    landroutenew.addLayer(new L.polyline([[start], [end]]));
    var j = j-1;
}
*/

var xia = [34.3531732077438, 108.932093850855],
    uru = [43.833684046611, 87.6183345779992],
    bis = [42.8734091280747, 74.5816715404984],
    sam = [39.6274736591024, 66.9844803279325],
    dus = [38.5571744907042, 68.7773689050383],
    teh = [35.6885598258803, 51.38814078684],
    ist = [41.0246883022808, 29.009504859837],
    mos = [55.7589824283313, 37.6172090636505],
    dui = [51.4347592485921, 6.76104251216256];

var landroute = L.featureGroup([
    L.marker(xia, {icon: landmarker, title:"Xian"}).bindPopup("<h2> Start/Endpoint Economic Belt</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Belt_and_Road_Initiative </a>  </p>").openPopup(),
    L.polyline([xia, uru], landstyle),
    L.marker(uru, {icon: landmarker, title:"Urumqi"}),
    L.polyline([uru, bis], landstyle),
    L.marker(bis, {icon: landmarker, title:"Bischkek"}),
    L.polyline([bis, sam], landstyle),
    L.marker(sam, {icon: landmarker, title:"Samarkand"}),
    L.polyline([sam, dus], landstyle),
    L.marker(dus, {icon: landmarker, title:"Duschanebe"}),
    L.polyline([dus, teh], landstyle),
    L.marker(teh, {icon: landmarker, title:"Teheran"}),
    L.polyline([teh, ist], landstyle),
    L.marker(ist, {icon: landmarker, title:"Istanbul"}),
    L.polyline([ist, mos], landstyle),
    L.marker(mos, {icon: landmarker, title:"Moscow"}),
    L.polyline([mos, dui], landstyle),
    L.marker(dui, {icon: landmarker, title:"Duisburg"}).bindPopup("<h2> Start/Endpoint Economic Belt</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Belt_and_Road_Initiative </a>  </p>").openPopup()
    ], {snakingPause: 500});

landroute.on('snakestart snake snakeend', function(ev){
    console.log(ev.type);
});
function snake_land() {
    map.fitBounds(landroute.getBounds());
    map.removeLayer(baseMaps["Abstract"]);
    baseMaps["World Physical"].addTo(map);
    map.addLayer(landroute);
    landroute.snakeIn();
}

//
//Maritime Silk Road
//
for (var i = 0, latlngs = [], len = marroute.length; i < len; i++) {
    latlngs.push(new L.LatLng(marroute[i][0], marroute[i][1]));
}

var searoute = L.polyline(latlngs, seastyle);

var seastations = L.featureGroup([
    L.marker(latlngs[0], {icon: harbour, title: "Fuzhou"}).bindPopup("<h2> Start/Endpoint Maritime Silk Road</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Belt_and_Road_Initiative </a>  </p>").openPopup(),
    L.marker([24.83,118.6], {icon: harbour, title: "Quanzhou",}),
    L.marker([24.50,117.7], {icon: harbour, title: "Zhanzhou"}),
    L.marker([22.93,113.2], {icon: harbour, title: "Guangzhou"}),
    L.marker([20.84,106.7], {icon: harbour, title: "Hanoi"}),
    L.marker([-6.04,106.8], {icon: harbour, title: "Jakarta"}),
    L.marker([3.07,101.31], {icon: harbour, title: "Kuala Lumpur"}),
    L.marker([22.52,88.31], {icon: harbour, title: "Kalkutta"}),
    L.marker([7.04,79.73], {icon: harbour, title: "Colombo"}),
    L.marker([-4.00,39.73], {icon: harbour, title: "Mombasa"}),
    L.marker([37.64,24.17], {icon: harbour, title: "Athens"}),
    L.marker([45.32,12.50], {icon: harbour, title: "Venice"}),
    L.marker([51.67,4.79], {icon: harbour, title: "Rotterdam"}).bindPopup("<h2> Start/Endpoint Maritime Silk Road</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Belt_and_Road_Initiative </a>  </p>").openPopup()
]);

searoute.on('snakestart snake snakeend', function(ev){
    console.log(ev.type);
});
function snake_sea() {
    map.setView([34.06, 65.7], 3);
    map.removeLayer(baseMaps["Abstract"]);
    /*map.fitBounds(L.latLngBounds(latlngs));*/
    baseMaps["World Physical"].addTo(map);
    seastations.addTo(map);
    map.addLayer(searoute);
    searoute.snakeIn();
}
//
//Historic Silk Road
//
var pgk = [39.902,116.386],
    tai = [37.866,112.542],
    bji = [34.352,107.241],
    wuw = [37.923,102.637],
    axi = [40.548,95.789],
    ham = [42.871,93.547],
    tur = [42.966,89.181],
    kuq = [41.719,82.950],
    kas = [39.457,76.006],
    and = [40.783,72.330],
    kok = [40.533,70.948],
    sam = [39.628,66.984],
    buc = [39.773,64.424],
    mer = [37.661,62.179],
    mes = [36.285,59.597],
    nis = [36.218,58.787],
    ema = [36.417,54.970],
    sai = [35.577,53.386],
    ter = [35.689,51.388],
    ekb = [34.801,48.511],
    bag = [33.321,44.377],
    pal = [34.562,38.281],
    alp = [36.206,37.143],
    ang = [39.930,32.854],
    kon = [41.029,29.006];

var histroute = L.featureGroup([
    L.marker(pgk, {icon: histmarker, title: "Peking"}).bindPopup("<h2> Start/Endpoint Historic Silk Route</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Silk_Road </a>  </p>").openPopup(),
    L.polyline([pgk, tai], histstyle),
    L.marker(tai, {icon: histmarker, title: "Taiyuan"}),
    L.polyline([tai, bji], histstyle),
    L.marker(bji, {icon: histmarker, title: "Baojii"}),
    L.polyline([bji, wuw], histstyle),
    L.marker(wuw, {icon: histmarker, title: "Wuwei"}),
    L.polyline([wuw, axi], histstyle),
    L.marker(axi, {icon: histmarker, title: "Anxi"}),
    L.polyline([axi, ham], histstyle),
    L.marker(ham, {icon: histmarker, title: "Hami"}),
    L.polyline([ham, tur], histstyle),
    L.marker(tur, {icon: histmarker, title: "Turpan"}),
    L.polyline([tur, kuq], histstyle),
    L.marker(kuq, {icon: histmarker, title: "Kuqa"}),
    L.polyline([kuq, kas], histstyle),
    L.marker(kas, {icon: histmarker, title: "Kaschgar"}),
    L.polyline([kas, and], histstyle),
    L.marker(and, {icon: histmarker, title: "Andijon"}),
    L.polyline([and, kok], histstyle),
    L.marker(kok, {icon: histmarker, title: "Kokant"}),
    L.polyline([kok, sam], histstyle),
    L.marker(sam, {icon: histmarker, title: "Samarkand"}),
    L.polyline([sam, buc], histstyle),
    L.marker(buc, {icon: histmarker, title: "Buchara"}),
    L.polyline([buc, mer], histstyle),
    L.marker(mer, {icon: histmarker, title: "Merw"}),
    L.polyline([mer, mes], histstyle),
    L.marker(mes, {icon: histmarker, title: "Meschhad"}),
    L.polyline([mes, nis], histstyle),
    L.marker(nis, {icon: histmarker, title: "Nischapur"}),
    L.polyline([nis, ema], histstyle),
    L.marker(ema, {icon: histmarker, title: "Emamschar"}),
    L.polyline([ema, sai], histstyle),
    L.marker(sai, {icon: histmarker, title: "Samina"}),
    L.polyline([sai, ter], histstyle),
    L.marker(ter, {icon: histmarker, title: "Teheran"}),
    L.polyline([ter, ekb], histstyle),
    L.marker(ekb, {icon: histmarker, title: "Ekbatan"}),
    L.polyline([ekb, bag], histstyle),
    L.marker(bag, {icon: histmarker, title: "Bagdad"}),
    L.polyline([bag, pal], histstyle),
    L.marker(pal, {icon: histmarker, title: "Palmyra"}),
    L.polyline([pal, alp], histstyle),
    L.marker(alp, {icon: histmarker, title: "Aleppo"}),
    L.polyline([alp, ang], histstyle),
    L.marker(ang, {icon: histmarker, title: "Angora"}),
    L.polyline([ang, kon], histstyle),
    L.marker(kon, {icon: histmarker, title: "Konstantinopel"}).bindPopup("<h2> Start/Endpoint Historic Silk Route</h2> <p style='font-size:12pt'> For more info, please visit: <a style ='font-size:9pt' href= 'url'> https://en.wikipedia.org/wiki/Silk_Road </a>  </p>").openPopup()
    ], {snakingPause: 600});

histroute.on('snakestart snake snakeend', function(ev){
    console.log(ev.type);
});
function snake_hist() {
    map.setView([44.39, 80,7], 4);
    map.removeLayer(baseMaps);
    map.addLayer(histroute);
    baseMaps["Abstract"].addTo(map);
    histroute.snakeIn();
}

var searoute_all = L.featureGroup([searoute, seastations]);

var allroutes = {
    "Historic": histroute,
    "Land Route": landroute,
    "Marine Route": searoute_all
};

map.fitBounds(searoute.getBounds());
L.control.layers(baseMaps, base_addons, allroutes).addTo(map);

