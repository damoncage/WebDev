/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,UserService, $rootScope) {
        var rm = this;
        rm.message = null;
        rm.register = register;


        function register(user) {
            console.log(user, "register controller");
            rm.message = null;
            if (user == null) {
                rm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                rm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                rm.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                rm.message = "Passwords must match";
                return;
            }
            UserService
                .register(user)
                .then(function (response) {
                    if (response.data != null) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }else{rm.message="User already exists!";}
                });
        }
    }
})();