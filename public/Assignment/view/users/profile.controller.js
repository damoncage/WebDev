/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$location){
        $scope.updateUser = updateuser;
        $scope.error = null;
        $scope.message = null;
        $scope.currentUser = UserService.getCurrentUser();
        console.log("currentUsercheck" + $scope.currentUser);
        if(!$scope.currentUser) {
            $location.url("/login");
        }
        else{
           $scope.uSer = $scope.currentUser;
        }

        function updateuser(user){
            $scope.error = null;
            $scope.message = null;
            if(!user.firstName)
                user.firstName = $scope.currentUser.firstName;
            if(!user.lastName)
                user.lastName = $scope.currentUser.lastName;
            if(!user.username)
                user.username = $scope.currentUser.username;
            if(!user.password)
                user.password = $scope.currentUser.password;

            console.log(user,$scope.currentUser);
            if(UserService.updateUser($scope.currentUser._id,user))
            {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
                console.log($scope.currentUser);
            }
            else{
                $scope.message = "Unable to update the user";
            }
            $scope.uSer = $scope.currentUser;
        }
    }
})();