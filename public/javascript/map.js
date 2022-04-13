var polylist = []
var user_distance = 0
var selNumA = 3
var selNumB = 2
var current_lat = 35.01
var current_lng = 135.01
var container = document.createElement('test');

function initMap() {
  var map = new google.maps.Map(document.getElementById("gmap"), {
    mapId: "67ef94185bd51ea8",
    zoom: 5,
    center: new google.maps.LatLng(38.1335584,137.695437),
    mapTypeId: "roadmap",
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    rotateControl: false,
    scaleControl: false,
    streetViewControl: false
  });
  imap = map
}

function getToken(){
  gapi.auth.authorize({client_id: client_id, scope: scope, immediate: false, response_type: "token"}, callback);
}

function callback(e){
  access_token = e.access_token;

  $.ajax({
    type:"GET",
    url: "https://www.googleapis.com/fitness/v1/users/me/dataSources",
    data: {
      "access_token": access_token
    },
    success: function(devicesJSON){
      clear_polyline()
      distance = get_user_distance(access_token, devicesJSON)
      stepsjson = get_steps(2)
      reached_and_unreached_list = devide_stepsJSON(stepsjson, distance)
      reached_list = reached_and_unreached_list[0]
      unreached_list = reached_and_unreached_list[1]
      draw_reached_polylines(imap, reached_list, "#0000FF", 0.7, 8)
      draw_unreached_polylines(imap, unreached_list, "#000000", 0.4, 4)
      change_map_center(34.409420190769815, 134.81190697518142)
      imap.setZoom(10)
    }
  });
}


function get_user_distance(access_token, responsejson){    
  var raw_devicesJSON
  var request = new XMLHttpRequest();
  const start = new Date('2000/1/1 0:00:00').getTime()
  const end = new Date().getTime()
  responsejson.dataSource.forEach(element => {
    if (element.dataStreamId.substr(0,3) == 'raw'){
      // 端末はrawとderived(重複多数)がある
      request_url ='https://www.googleapis.com/fitness/v1/users/me/dataSources/' + element.dataStreamId + '/datasets/'+start.toString()+'000000'+'-'+end.toString()+'000000?access_token=' + access_token
      request.open('GET', request_url, false);
      request.send(null);
      if (request.status === 200) {raw_devicesJSON = JSON.parse(request.responseText)}
      raw_devicesJSON.point.forEach(dis => {
        key_name = Object.keys(dis.value[0])
        if (key_name[0] == "intVal"){
          user_distance += dis.value[0].intVal
        }else{
          user_distance += dis.value[0].fpVal
        }
      })
    }
  })
  return user_distance
}

function get_steps(i){
  var stepsJSON
  var request = new XMLHttpRequest();
  request.open('GET', '/steps/'+ i +'.json', false);
  request.send(null);
  if (request.status === 200) {stepsJSON = JSON.parse(request.responseText)}
  return stepsJSON
}

function devide_stepsJSON(step_JSON, user_distance){
  var step_total = 0
  var devided_list = []
  var reached_list = []
  var unreached_list = []
  step_JSON.forEach(dis => {
    step_total += dis.distance_value
    if (user_distance > step_total){
      reached_list.push(dis)
    }else{
      unreached_list.push(dis)
    }
  })
  devided_list.push(reached_list)
  devided_list.push(unreached_list)
  return devided_list
}

function draw_reached_polylines(imap, list, color, opacity, stroke_weight){
  list.forEach( string_element =>{
    var decoded_list = get_decoded_latlng_list(string_element.polyline_points)
    const onePath = new google.maps.Polyline({
      path: decoded_list,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: stroke_weight,
    });
    polylist.push(onePath)
    onePath.setMap(imap);
  })
  
  var p1 = new google.maps.LatLng((decode_polyline(list.slice(-1)[0].polyline_points)).slice(-1)[0].latitude,
                                  (decode_polyline(list.slice(-1)[0].polyline_points)).slice(-1)[0].longitude)
  var p2 = new google.maps.LatLng((decode_polyline(list.slice(-2)[0].polyline_points)).slice(-1)[0].latitude,
                                  (decode_polyline(list.slice(-2)[0].polyline_points)).slice(-1)[0].longitude)
  var angle = google.maps.geometry.spherical.computeHeading(p1, p2);
  put_current_loc_marker((decode_polyline(list.slice(-1)[0].polyline_points)).slice(-1)[0].latitude,
                         (decode_polyline(list.slice(-1)[0].polyline_points)).slice(-1)[0].longitude,
                         angle)
}

function draw_unreached_polylines(imap, list, color, opacity, stroke_weight){
  list.forEach( element =>{
    var decoded_list = get_decoded_latlng_list(element.polyline_points)
    const onePath = new google.maps.Polyline({
      path: decoded_list,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: stroke_weight,
    });
    polylist.push(onePath)
    onePath.setMap(imap);
  })
}

function get_decoded_latlng_list(encoded_string){
  var count = 0
  var poly_latlng_list = []
  decode_polyline(encoded_string).forEach(element => {
    element.lat = element.latitude
    element.lng = element.longitude
    delete element.latitude;
    delete element.longitude;
    poly_latlng_list[count] = element
    count += 1
  });
  return poly_latlng_list
}

function decode_polyline(encoded) {
  if (!encoded) {return [];}
  var poly = [];
  var index = 0, len = encoded.length;
  var lat = 0, lng = 0;
  while (index < len) {
    var b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);
    var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);
    var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;
    var p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
}

function change_map_center(x, y){ 
  imap.panTo(new google.maps.LatLng(x, y))
}

function clear_polyline(){
  polylist.forEach( element =>{
    element.setMap(null)
  })
}

document.getElementById("demo").onclick = function() {
  var buttonUI = document.getElementById("demo");
  var zoom = imap.getZoom();

  var tempNum = 0
  user_distance = Math.random()*500000
  
  setAwaji()
  if (selNumA==1 || selNumA==3){
    selNumB = selNumA
    selNumA = 2
    setShikoku()
  }else if (selNumB==1){
    selNumA = 3
    selNumB = 2
    setJapan()
  }else{
    selNumA = 1
    selNumB = 2
    setAwaji();
  }

  reload_dis_disp()
}

document.getElementById("zoom_in").onclick = function() {
  var buttonUI = document.getElementById("zoom_in");
  var zoom = imap.getZoom();
  imap.setZoom(zoom + 1);
}

document.getElementById("zoom_out").onclick = function() {
  var buttonUI = document.getElementById("zoom_out");
  var zoom = imap.getZoom();
  imap.setZoom(zoom - 1);
}

document.getElementById("awaji").onclick = function() {
  var buttonUI = document.getElementById("awaji");
  var zoom = imap.getZoom();
  setAwaji();
}

document.getElementById("shikoku").onclick = function() {
  var buttonUI = document.getElementById("shikoku");
  var zoom = imap.getZoom();
  setShikoku();
}

document.getElementById("japan").onclick = function() {
  var buttonUI = document.getElementById("shikoku");
  var zoom = imap.getZoom();
  setJapan();
}

function setAwaji(){
  clear_polyline()
  change_map_center(34.409420190769815, 134.81190697518142)
  imap.setZoom(10)
  distance = user_distance
  stepsjson = get_steps(2)
  reached_and_unreached_list = devide_stepsJSON(stepsjson, distance)
  reached_list = reached_and_unreached_list[0]
  unreached_list = reached_and_unreached_list[1]
  draw_reached_polylines(imap, reached_list, "#0000FF", 0.7, 8)
  draw_unreached_polylines(imap, unreached_list, "#000000", 0.4, 4)
  put_start_marker(34.60275,135.00774)
}

function setShikoku(){
  clear_polyline()
  change_map_center(33.73356985203722, 133.54433908082672)
  imap.setZoom(7)
  distance = user_distance
  stepsjson = get_steps(3)
  reached_and_unreached_list = devide_stepsJSON(stepsjson, distance)
  reached_list = reached_and_unreached_list[0]
  unreached_list = reached_and_unreached_list[1]
  draw_reached_polylines(imap, reached_list, "#0000FF", 0.7, 8)
  draw_unreached_polylines(imap, unreached_list, "#000000", 0.4, 4)
  put_start_marker(34.18944,134.60962)
}

function setJapan(){
  clear_polyline()
  change_map_center(38.1335584,137.695437)
  imap.setZoom(5)
  distance = user_distance
  stepsjson = get_steps(1)
  reached_and_unreached_list = devide_stepsJSON(stepsjson, distance)
  reached_list = reached_and_unreached_list[0]
  unreached_list = reached_and_unreached_list[1]
  draw_reached_polylines(imap, reached_list, "#0000FF", 0.7, 8)
  draw_unreached_polylines(imap, unreached_list, "#000000", 0.4, 4)
  put_start_marker(45.44644, 141.64671)
}

function put_current_loc_marker(lat, lng, rat){
  if (rat>0){img_src = 'images/current_p_r.png'}
  else {img_src = 'images/current_p.png'}
  var markerOptions = {
    map: imap,
    position: {lat: lat, lng: lng},
    icon: {
      url: img_src,
      scaledSize: new google.maps.Size(40, 40)
    },
  };
  var marker = new google.maps.Marker(markerOptions);
  polylist.push(marker)
}

function put_start_marker(lat, lng){
  var markerOptions = {
    map: imap,
    position: {lat: lat, lng: lng},
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'images/start_flag.png',
      scaledSize: new google.maps.Size(40, 40)
    },
  };
  var marker = new google.maps.Marker(markerOptions);
  polylist.push(marker)
}

function reload_dis_disp() {
  var message = "移動距離は "+Math.round(user_distance/1000) + " km"
  document.getElementById("distance").innerText = message;
}