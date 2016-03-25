/**
 * Created by cage on 3/7/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("loginController",loginController)

    function loginController(UserService, $location){
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
            }
            else {
                FB.login();
            }
        });
        var um = this;
        um.login = login;
        um.message = null;


        function init(){
            console.log("login");
        }
        init();

        function login(user){
            console.log(user.username,user.password);
            if(!user || !user.username || !user.password){
                um.message = "Invalid Username / Password!";
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
            })
                .then(function(response){
                  if(response.data){
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