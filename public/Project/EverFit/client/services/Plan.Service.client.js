/**
 * Created by cage on 3/25/16.
 */
(function (){
    angular
        .module("EverFitApp")
        .factory("PlanService",PlanService);

    function PlanService($http){
        var api = {
            findPlanByIds:findPlanByIds,
            findPlanById:findPlanById,
            findPlanByName:findPlanByName,
            userLikesPlan:userLikesPlan
        }
        return api;

        function findPlanByIds(PlanIDs){
            return $http.post("/api/project/plans",PlanIDs);
        }

        function findPlanById(planId){
            return $http.get("/api/project/plan/detail/" + planId);
        }

        function findPlanByName(planName){
            return $http.get("/api/project/plan/"+planName);
        }

        function userLikesPlan(user,planId){
    //        console.log("service",user,planId);
            return $http.post("/api/project/user/plan/"+planId, user);
        }
    }
})();