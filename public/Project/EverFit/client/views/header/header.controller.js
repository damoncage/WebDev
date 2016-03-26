/**
 * Created by cage on 3/24/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService){
        function init(){
            UserService.getCurrentUser()
                .then(function(response) {
                    UserService.setCurrentUser(response.data);
                });
        }    init();
    //    console.log("headeruser \n" + $scope.currentUser);
        $scope.logout = logout;

        function logout(){
            UserService.logout()
            .then(function(response){
                console.log("logout");
                UserService.setCurrentUser(null);
                $location.url("/home");
            });
        }
    }
})();