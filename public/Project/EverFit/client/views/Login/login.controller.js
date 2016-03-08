/**
 * Created by cage on 3/7/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("loginController",loginController)

    function loginController(UserService, $location){
        var cm = this;
        cm.login = login;
        cm.message = null;


        function init(){
            console.log("login");
        }
        init();

        function login(user){
            console.log("login");
            if(!user || !user.username || !user.password){
                console.log("Invalid");
                cm.message = "Invalid Username / Password!";
            }
            UserService
                .login({
              username: user.username,
                    password:user.password
            })
                .then(function(response){
                  if(response.data){
                      UserService.setCurrentUser(response.data);
                      $location.url("/profile");
                  }
                });
        }

    }
})();