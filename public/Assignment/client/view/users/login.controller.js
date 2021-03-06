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
            UserService
                .findUserByCredentials(user)
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        console.log(response.data);
                        $location.url("/home");}
                    else{
                    $scope.message = "Invalid Username or Password!";
                    }
                },function (err){
                    $scope.message = "Invalid Username or Password!";
            });
        }
    }
})();