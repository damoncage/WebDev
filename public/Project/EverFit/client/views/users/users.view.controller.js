/**
 * Created by cage on 4/24/16.
 */
(function(){
   angular
       .module("EverFitApp")
       .controller("usersController",usersController);

    function usersController(UserService,PlanService,$location,$routeParams,$rootScope){
        var um = this;
        var username = $routeParams.username;

        function init(){
            UserService.findUserByUsername(username)
                .then(function(response){
                    um.target = response.data;
                    um.target.emails = um.target.emails.toString();
                    if(um.target.follower.indexOf($rootScope.currentUser._id)==-1){
                        um.follow = 'follow';
                    }else{
                        um.follow = 'followed';
                    }
                });
        }init();
    }
})();