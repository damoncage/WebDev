/**
 * Created by cage on 2/21/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService,$scope,$location){
        $scope.message = null;
        $scope.login = login;
        function login(user){
            $scope.message = null;
            if(!user || !user.username|| !user.password){
            $scope.message = "Input information in required fields.";
            return;
            }
            var validation = UserService.findUserByCredentials(user.username,user.password);
            if(validation){
                UserService.setCurrentUser(validation);
                $location.url("/home");
            }
            $scope.message = "Invalid Username or Password!";
        }
    }
})();