/**
 * Created by cage on 3/26/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("fitPlanController",fitPlanController);

    function fitPlanController($location,$routeParams,PlanService,UserService){
        var planName = $routeParams.PlanName;
        var fm = this;
        fm.order = order;
        fm.userLikesPlan = userLikesPlan;
        fm.predicate = 'follower.length';
        fm.reverse = true;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    fm.user = response.data;
                    console.log("plan"+planName+"\n user \n",fm.user);
                });
            if(!planName)
                planName = -1;
            PlanService
                .findPlanByName(planName)
                .then(function(response){
                    console.log(response.data);
                    fm.plans = response.data;
                });
        } init();

     function userLikesPlan(planId){
  //       console.log("plan",fm.user,planId);
         var user = {
            _id:fm.user._id,
            username:fm.user.username
         }
         if(!fm.user){
             $location.url("/login");
             return;
         }
         PlanService
             .userLikesPlan(user,planId)
             .then(function(response){
                console.log("Favorite\n",response.data);
                 init();
             });
     }

        function order(part){
            fm.reverse = (fm.predicate === part)? !fm.reverse : false;
            if(fm.reverse)
                fm.sortIcon = "glyphicon glyphicon-triangle-bottom";
            else
                fm.sortIcon = "glyphicon glyphicon-triangle-top";
            fm.predicate = part;
        }
    }
})();