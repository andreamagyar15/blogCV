$(onHtmlLoaded);
function onHtmlLoaded(){
    var options={
     enableHighAccuracy: true,
     timeout: 5000,
     maximumAge: 0
};
    
   const position= navigator.geolocation.getCurrentPosition(success, error, options);
   
}

function success(pos) {
  var crd = pos.coords;
  console.log(crd);
  console.log(`Latitude : ${crd.latitude}`);
  const latitude=$(crd.latitude);
  
  console.log(`Longitude: ${crd.longitude}`);
  const longitude=$(crd.latitude);
  
  console.log(`More or less ${crd.accuracy} meters.`);
  
  const geoHTML=document.getElementById("geoLocation");
  geoHTML.innerHTML+=" Latitude= "+ crd.latitude+" Longitude= "+crd.longitude;
  
  const currentCityHTML=document.getElementById("currentCity");
  const temperatureHTML=document.getElementById("temperature");
  
  getCurrentCity(crd.latitude,crd.longitude)
  .then (function(response){
    console.log(response);
    currentCityHTML.innerHTML+= response.results[3].address_components[0].long_name+" "+response.results[3].address_components[3].short_name;
    getCurrentTemperature (response.results[3].address_components[0].long_name,response.results[3].address_components[3].short_name)
        .then (function(responseTemperature){
            console.log(responseTemperature);
             temperatureHTML.innerHTML+=responseTemperature.current_observation.dewpoint_c+" C, feels like: "+responseTemperature.current_observation.feelslike_c+" C";
    });
  })

};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

function getCurrentCity(lat,lon){
     const city=$.ajax({
        url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyCW15UKjV1uVneWDjF0Fz6FYugT1DkCl4E",
        method:"GET",
        });
        return city;   
        
}

function getCurrentTemperature(city,county){
   const temperature = $.ajax({
        url:"https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/"+county+"/"+city+".json",
        method:'GET',
    });
    console.log(temperature);
    return temperature;
}