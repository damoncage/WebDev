/**
 * Created by cage on 4/24/16.
 */
(function(){
   angular
       .module("EverFitApp")
       .controller("usersController",usersController);

    function usersController(UserService,PlanService,$location,$routeParams,$rootScope){

        var username = $routeParams.username;
        var um = this;
        um.message = null;
        um.followUser = followUser;
        um.follow = null;

        function init(){
            UserService.findUserByUsername(username)
                .then(function(response){
                    um.target = response.data;
                    um.target.emails = um.target.emails.toString();
                    if(um.target.follower.map(function(e){return e._id}).indexOf($rootScope.currentUser._id)==-1){
                        um.follow = "follow";
                    }else{
                        um.follow = "followed";
                    }
                    console.log(um.follow,um.target.follower.indexOf($rootScope.currentUser._id));
                });

        }init();

        function followUser(){
            if(!$rootScope.currentUser){
                return $location.url("/login");
            }
            var target = {
                _id : um.target._id,
                username: um.target.username
            };
            UserService.followUser($rootScope.currentUser._id,target)
                .then(function(response){
                    if(response.data){
                        init();
                    }else{
                        um.message = "Fail to follow user, try again later.";
                    }},function (err){
                        um.message = 'Sorry, an error occured, try again later.';
                });
        }
    }
})();