function initMap() {
  var map = new google.maps.Map(document.getElementById("gmap"), {
    mapId: "67ef94185bd51ea8",
    zoom: 6,
    center: new google.maps.LatLng(43.6850804,142.7975314),
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
      distance = get_user_distance(access_token, devicesJSON)
      stepsjson = get_steps()
      reached_and_unreached_list = devide_stepsJSON(stepsjson, distance)
      reached_list = reached_and_unreached_list[0]
      unreached_list = reached_and_unreached_list[1]
      draw_reached_polylines(imap, reached_list, "#0000FF", 0.7, 8)
      draw_unreached_polylines(imap, unreached_list, "#000000", 0.4, 4)
      change_map_center(43.6850804,142.7975314)
    }
  });
}


function get_user_distance(access_token, responsejson){    
  var user_distance = 0
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

function get_steps(){
  var stepsJSON
  var request = new XMLHttpRequest();
  request.open('GET', '/steps.json', false);
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
  list.forEach( element =>{
    var time_count = 1
    var decoded_list = get_decoded_latlng_list(element.polyline_points)
    const onePath = new google.maps.Polyline({
      path: decoded_list,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: stroke_weight,
    });
    onePath.setMap(imap);
  })
}

function draw_unreached_polylines(imap, list, color, opacity, stroke_weight){
  list.forEach( element =>{
    var time_count = 1
    var decoded_list = get_decoded_latlng_list(element.polyline_points)
    const onePath = new google.maps.Polyline({
      path: decoded_list,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: stroke_weight,
    });
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