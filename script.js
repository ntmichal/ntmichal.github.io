function setUserData(name, firstName, lastName, imgUrl){
    document.getElementById("facebookimg").src = imgUrl;
    document.getElementById("name").innerHTML = name;
    document.getElementById("firstname").innerHTML = firstName;
    document.getElementById("lastname").innerHTML = lastName;
}


function setVisible(){
    var fbData = document.getElementById("fbData");
    var fbButton = document.getElementById("fbButton");


    fbData.style.display = fbData.style.display === 'none' ? 'block' : 'none';
    fbButton.style.display = fbButton.style.display === 'block' ? 'none' : 'block';
}

var userData = {
    name: "",
    firstName: "",
    lastName: "",
    picture: ""
}
function logIn(){

    FB.login(function(response){
       if(response.status == "connected"){
           userData.userID = response.authResponse.userID;
           FB.api('/me?fields=id,name,first_name,last_name,picture.type(large)'
           , (user_data)=>{
                userData.name = user_data.name;
                userData.firstName = user_data.first_name;
                userData.lastName = user_data.last_name;
                userData.picture = user_data.picture.data.url;
                setUserData(userData.name, userData.firstName, userData.lastName, userData.picture);                
                setVisible();
           })
       }
    },{scope: 'public_profile'})
};

function logOut(){
    FB.logout(function(response) {
        setVisible();
        userData = {
            name: "",
            firstName: "",
            lastName: "",
            picture: ""
        }
    });

}
window.fbAsyncInit = function() {
  FB.init({
        appId      : '459422911471748',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
  });
    
  FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); 