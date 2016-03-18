/**
 * Created by cage on 2/21/16.
 */
(function (){
    angular
        .module("FormBuilderApp")
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