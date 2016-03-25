/**
 * Created by cage on 3/24/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService){
        console.log("headeruser \n" + $scope.currentUser);
        /*$scope.currentUser = UserService.getCurrentUser();*/
        $scope.logout = logout;

        function logout(){
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();