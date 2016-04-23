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
            userLikesPlan:userLikesPlan,
            createPlan:createPlan,
            updatePlan:updatePlan,
            removePlan:removePlan,
            addReview:addReview,
            deleteReview:deleteReview
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

        function createPlan(plan){
            return $http.post("/api/project/plan",plan);
        }

        function updatePlan(plan){
            return $http.put("/api/project/plan/"+plan._id,plan);
        }

        function removePlan(planId){
            return $http.delete("api/project/plan/"+planId);
        }

        function addReview(planId,review){
            return $http.post("/api/project/plan/"+planId+"/review",review);
        }

        function deleteReview(planId,reviewId){
            console.log(planId,reviewId);
            return $http.delete("/api/project/plan/"+planId+"/review/"+reviewId);
        }
    }
})();