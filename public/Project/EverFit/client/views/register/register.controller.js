/**
 * Created by cage on 3/8/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .controller("registerController",registerController)

    function registerController(UserService,$location){
        var vm = this;
        vm.register = register;

        function register(user){
            UserService
                .register(user)
                .then(function (response){
                    var currentUser = response.data;
                    if(currentUser!=null){
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();