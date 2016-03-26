/**
 * Created by cage on 3/26/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$location){
        $scope.updateUser = updateuser;
        $scope.error = null;
        $scope.message = null;
        console.log("currentUsercheck",$scope.currentUser);
        if(!$scope.currentUser) {
            $location.url("/login");
        }
        else{
            $scope.user = {
                id:$scope.currentUser._id,
                firstName: $scope.currentUser.firstName,
                lastName: $scope.currentUser.lastName,
                username:$scope.currentUser.username,
                password:$scope.currentUser.password,
                email:$scope.currentUser.email
            }
        }

        function updateuser(user){
            $scope.error = null;
            $scope.message = null;
            user._id = $scope.currentUser._id;
            if(!user.firstName)
                user.firstName = $scope.currentUser.firstName;
            if(!user.lastName)
                user.lastName = $scope.currentUser.lastName;
            if(!user.username)
                user.username = $scope.currentUser.username;
            if(!user.password)
                user.password = $scope.currentUser.password;

    //        console.log(user,$scope.currentUser);
            console.log("controller,update"+user);
            UserService
                .updateUser(user._id,user)
                .then(function (response){
                    if(response.data){$scope.message = "User updated successfully";
                        UserService.setCurrentUser(response.data);
                        console.log($scope.currentUser);}
                    else{
                        $scope.error = "Unable to update the user";}
                });
        }
    }
})();