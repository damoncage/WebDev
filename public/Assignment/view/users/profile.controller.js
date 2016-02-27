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
        console.log($scope.currentUser);
        if(!$scope.currentUser)
        $location.url("/home");

        function updateuser(user){
            $scope.error = null;
            $scope.message = null;
            UserService.updateUser($scope.currentUser._id,user);

            if(user){
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            }
            else{
                $scope.message = "Unable to update the user";
            }
        }
    }
})();