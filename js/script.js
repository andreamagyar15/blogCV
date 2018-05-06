window.addEventListener("load",function(){
    var dropdownContent=document.getElementsByClassName("dropdownContent");
    var dropdown=document.getElementsByClassName("dropdown");
    var dropdownButton=document.getElementsByClassName("dropdownButton");
    var menu=document.getElementById("menuIcon");
    var navContent=document.getElementsByClassName("navbarContent")[0];
    dropdown[0].addEventListener("click",function(){
        if (dropdownContent[0].style.display==""){
            dropdownContent[0].style.display="block";
        }
        else {
            dropdownContent[0].style.display="";  
        }
    })
        menu.addEventListener("click",function(){
            if (navContent.className==="navbarContent" && navContent.id=="navShow"){
                navContent.id="navHide"
                } else{
                navContent.id="navShow";
            }
         
        })
   
  
})

