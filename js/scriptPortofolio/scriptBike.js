$(onHtmlLoaded);

function onHtmlLoaded(){
    var BikeUrl='https://api.citybik.es/v2/networks';
    getElements(BikeUrl)
    .then (function(response){
        displayElements(BikeUrl,response);
        return 23;
    })
    

}
function getElements (BikeUrl){
            var networkElements=fetch(BikeUrl,{
            method: 'GET', })
            .then(function(response){
                return response.json();
            })
           
             return networkElements;
          
}
function displayElements(BikeUrl,bikeNetwork){
        var template=document.getElementById("bikeTemplate");
        var container=document.getElementById("container");
        for (var i=0;i<20;i++){
            var networkClone=template.cloneNode(true);
            var bikeNetworkElement=bikeNetwork.networks[i];
            networkClone.id=bikeNetworkElement.id;
            var companyName=networkClone.querySelector(".companyName");
            var companyLocation=networkClone.querySelector(".companyLocation");
            
            companyName.innerHTML+=bikeNetworkElement.name;
            companyLocation.innerHTML+=bikeNetworkElement.location.city;
            getBikeStations(BikeUrl+"/"+bikeNetworkElement.id,networkClone);
            var buttonDelete=networkClone.querySelector(".buttonDelete");
            buttonDelete.addEventListener("click",function (event){
                deleteElement(event);
                
            });
            
             container.appendChild(networkClone);
        }
    
}

function getBikeStations(RootUrl,networkClone){
    var bikeStations=networkClone.querySelector(".bikeStations");
    $.ajax({
        url:RootUrl,
        method:'GET',
    }).then(function(response){
        var result=response.network.stations;
        bikeStations.innerHTML+=result.length;
    })
      .catch(displayError);
   
}
function deleteElement(event){
    console.log(event.path[2].id);
            event.path[2].remove();
        

}
function displayError(jqXHR,textStatus,errorThrom){
    console.log(jqXHR);
    var errorMessage=document.getElementById("container");
    errorMessage.innerHTML="Error : "+jqXHR.status;
}