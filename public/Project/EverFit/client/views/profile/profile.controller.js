/**
 * Created by cage on 3/26/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$location,$rootScope){
        var pm = this;
        pm.updateUser = updateuser;
        pm.error = null;
        pm.message = null;
        console.log("currentUsercheck",$rootScope.currentUser);

        function init(){
            if(!$rootScope.currentUser) {
                $location.url("/login");
            }
            else{
                pm.user = {
                    firstName: $rootScope.currentUser.firstName,
                    lastName: $rootScope.currentUser.lastName,
                    username:$rootScope.currentUser.username,
                    password:$rootScope.currentUser.password,
                    emails:$rootScope.currentUser.emails,
                    follower:$rootScope.currentUser.follower,
                    follow:$rootScope.currentUser.follow,
                    plans:$rootScope.currentUser.plans
                }
            }
        }init();


        function updateuser(user){
            pm.error = null;
            pm.message = null;
            var id = $rootScope.currentUser._id;
            console.log("controller,update",user.emails,id);
            UserService
                .updateUser(id,user)
                .then(function (response){
                    if(response.data){pm.message = "User updated successfully";
                        UserService.setCurrentUser(response.data);
                        console.log($rootScope.currentUser);
                    }
                    else{
                        pm.error = "Unable to update the user";}
                });
        }
    }
})();