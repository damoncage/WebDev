/**
 * Created by cage on 3/8/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .controller("registerController",registerController);

    function registerController(UserService,$location){
        var vm = this;
        vm.register = register;
        vm.message = null;

        function register(user){
            console.log(user,"register controller");
            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                vm.message = "Passwords must match";
                return;
            }
            UserService
                .getUserProfile(user)
                .then(function(response){
                    if(!response.data){
                        return UserService.register(user);
                    }
                    vm.message = "User already exists!";
                    return;
                })
                .then(function (response){
                        var currentUser = response.data;
                    console.log("register succeed!",currentUser);
                        if(currentUser!=null){
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                });
        }
    }
})();