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
        function init(){
            UserService
                .getCurrentUser()
                .then(function(response){
                    fm.user = response.data;
                    console.log("plan"+planName+"\n user \n",fm.user);
                });
            fm.userLikesPlan = userLikesPlan;
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
         if(!fm.user){
             $location.url("/login");
             return;
         }
         PlanService
             .userLikesPlan(fm.user,planId)
             .then(function(response){
                console.log("Favorite\n",response.data);
                 init();
             });

     }
    }
})();