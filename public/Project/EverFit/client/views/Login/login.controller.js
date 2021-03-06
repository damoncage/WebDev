/**
 * Created by cage on 3/7/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("loginController",loginController)

    function loginController(UserService, $location){
        // This is called with the results from from FB.getLoginStatus().
        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into Facebook.';
            }
        }
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        var um = this;
        um.login = login;
        um.message = null;

        function init(){
            console.log("login");
            if(um.currentUser){
                console.log(um.currentUser);
                $location.url("/profile");
            }
        }
        init();

        function login(user){
           // console.log(user.username,user.password);
            if(!user || !user.username || !user.password){
                um.message = "Input your Username & Password!";
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
            })
                .then(function(response){
                  if(response.data){
                      FB.getLoginStatus(function(response) {
                          if (response.status === 'connected') {
                              console.log('Logged in.');
                          }
                          else {
                              FB.login();
                          }
                      });
                      UserService.setCurrentUser(response.data);
                      $location.url("/profile");
                  }
                    else{
                      um.message = "Invalid UserName or PassWord!";
                  }
                });
        }
    }
})();