/**
 * Created by cage on 3/25/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .factory("planService",planService);

    function planService($http){
        var api = {
            findAllPlans:findAllPlans,
            findPlanById:findPlanById
        }
    }
});