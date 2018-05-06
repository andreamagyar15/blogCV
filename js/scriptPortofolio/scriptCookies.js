/*global localStorage */ /*Foarte frumos ai construit aplicatia! :) Bravo*/
document.addEventListener("DOMContentLoaded",onHtmlLoaded);

function onHtmlLoaded(){
    
 
    getTemperature();
}
function getTemperature(){
         fetch ("https://api.wunderground.com/api/cfbfc5f603141e07/conditions/q/RO/Cluj_Napoca.json",{
                method:"GET" })
                .then (function(response){
                   return response.json();
                })
                .then(function(jsonResponse){
                 displayTemperature(jsonResponse.current_observation.feelslike_c,jsonResponse.current_observation.feelslike_f);
                 console.log( jsonResponse);
                 dispalyImage(jsonResponse.current_observation.feelslike_c);
                })
    
}
function dispalyImage(temperature){
    const imageContainer=document.getElementById("imageTemperature");
    if (temperature>=5){
       imageContainer.innerHTML="<img  src= css/images/SunnyImage.jpg />" ;
    }else{
        imageContainer.innerHTML="<img  src= css/images/coldweather.jpg />"; 
    }
}
function getCookiesAsObject(){
    const stringCookies=document.cookie;
    const arrayCookies=stringCookies.split("; ");
    console.log(arrayCookies);
    const cookies={};
    arrayCookies.forEach(function (c){
        const cookie=c.split("=");
        console.log(cookie);
        cookies[cookie[0]]=cookie[1];
    });
    console.log(cookies);
    return cookies;
}
function displayTemperature(tempC,tempF){
    var cookies=getCookiesAsObject();
    const preferredTemperature=window.localStorage ? localStorage.getItem("temperature") : cookies.temperature;
    const radioButton=document.getElementsByName("temperature");
    const temperatureContainer=document.getElementById("temperatureContainer");
    
    radioButton.forEach(function(radio){
        if (radio.value=== preferredTemperature){
            radio.checked="checked";
            console.log(radio.checked);
        }
        if(preferredTemperature==="C"){
            temperatureContainer.innerHTML=tempC; 
         }else{
            temperatureContainer.innerHTML=tempF;
         }
        radio.addEventListener("click",function(){
            if (radio.value==="C"){
                temperatureContainer.innerHTML=tempC;
             }else{
                 temperatureContainer.innerHTML=tempF;  
             }
            if (window.localStorage){
                 localStorage.setItem("temperature",this.value);
             }
            else {
                 document.cookie="temperature="+this.value;
            }}) ; 
        
    }); 

}