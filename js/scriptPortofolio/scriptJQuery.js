$(onLoaded);
function onLoaded(){

    function submitClick(){
         console.clear();
         event.preventDefault();
         var firstName=$('input[name=FirstName]');
         console.log(firstName[0].value);
         var lastName=$('input[name=LastName]');
         console.log(lastName[0].value);
         var comment=$('textarea');
         console.log(comment.val()); 
         var valid=true;
         var radios=$('input[name=gender]');

         if (firstName[0].value===''){
             firstName.css("border", "solid 1px red");
             valid=false;
         } else{
               firstName.css("border","");
         }
         
         if (lastName[0].value===''){
             lastName.css( "border","solid 1px red");
              valid=false;
         } else{
             lastName.css("border","");
         }
         
         if (comment.val()===''){
             comment.css( "border","solid 1px red");
              valid=false;
         } else {
             comment.css("border","");
         }
         
         var i=0;
         var validRadio=false;
         while (radios.length>i){
             if (radios[i].checked){
                 validRadio=true;
                 console.log(radios[i].value);
                 break;
             }
             i++;
         }
         if (!validRadio){
             valid=false;
         }
         
         if (!valid){
             alert("Validation failed");
             
         }else {
             var validationMessage=$("#validationBanner");
             var banner=$("<p>"+"Thank you for contacting us. "+firstName[0].value+"</p>");
             banner.css ("background-color","green").css('color', 'white');
             validationMessage.append(banner);
         }
    }
    var btnSubmit=$("#btn-submit");
    btnSubmit.on("click",submitClick);
}