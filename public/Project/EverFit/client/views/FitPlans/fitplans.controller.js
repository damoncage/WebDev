/**
 * Created by cage on 3/26/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("fitPlanController",fitPlanController);

    function fitPlanController($location,$routeParams,PlanService,UserService){
        var planName = $routeParams.PlanName;
        PlanService
            .findPlanByName(planName)
            .then(function(response){
                console.log(response.data);
            });
    }
})();