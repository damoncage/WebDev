/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope){
        $scope.message = null;
        $scope.register = register;

        function register(user){
            console.log(user)
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            var checkuser = UserService.findUserByCredentials(user.username,user.password);
            if (checkuser != null) {
                $scope.message = "User already exists";
                return;
            }
            var newUser = UserService.createUser($scope.user);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }
    }
})();