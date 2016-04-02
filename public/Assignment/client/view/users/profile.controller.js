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
        console.log("currentUsercheck",$scope.currentUser);
        if(!$scope.currentUser) {
            $location.url("/login");
        }

        function updateuser(user){
            console.log(user);
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
            if(!user.emails)
                user.emails = $scope.currentUser.emails;
            if(typeof user.emails == "string"){
                user.emails = user.emails.split(",");
            }
            UserService
                .updateUser($scope.currentUser._id,user)
                .then(function (response){
                    $scope.message = "User updated successfully";
                        UserService.setCurrentUser(response.data);
                        console.log("return \n",$scope.currentUser);},
                    function(err){
                        $scope.error = "Unable to update the user \n"+err;
                    }
                );
        }
    }
})();