/**
 * Created by cage on 2/21/16.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location,$scope, $rootScope, UserService){
        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
            });
        console.log("headeruser \n" + $rootScope.currentUser);
        $scope.logout = logout;
        function logout(){
            UserService.logout()
                .then(function(response){
                    if(response.data){
                    UserService.setCurrentUser(null);
                    $location.url("/home");}
                })
        }
    }
})();