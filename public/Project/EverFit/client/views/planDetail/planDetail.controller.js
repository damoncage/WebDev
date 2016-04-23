/**
 * Created by cage on 4/22/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("planDetailController",planDetailController);

    function planDetailController($routeParams,PlanService,UserService,$location,$rootScope){
        var dm = this;
        dm.plan = null;
        dm.search = search;
        dm.addReview = addReview;
        dm.deleteReview = deleteReview;
        dm.message = null;


        function init(){
            var planId = $routeParams.planId;
            PlanService.findPlanById(planId)
                .then(function(response){
                    if(response.data){
                        dm.plan = response.data;
                        console.log(dm.plan)
                    }else
                    $location.url("/fitplans");
                },function(err){
                    $location.url("/fitplans");
                });
        }init();

        function search(key){
            $location.url("/fitplans/"+key);
        }

        function addReview(review){
            var planId = $routeParams.planId;
              if($rootScope.currentUser){
               review.userId = $rootScope.currentUser._id;
               review.username = $rootScope.currentUser.username;
               review.date = new Date().toLocaleString();
               PlanService.addReview(planId,review)
                   .then(function(response){
                   if(response.data){
                       dm.plan.reviews = response.data;
                   }else{
                       dm.message = 'Fail to add comment, try again later.'
                   }
               });
           } else
            $location.url("/login");
        }

        function deleteReview(review){
            console.log(review);
            var planId = $routeParams.planId;
            if($rootScope.currentUser._id == review.userId){
                PlanService.deleteReview(planId,review._id)
                    .then(function(response){
                        if(response.data){
                            dm.plan.reviews = response.data;
                        }else{
                            dm.message = 'Fail to delete comment, try again later.'
                        }
                    });
            } else
                $location.url("/login");
        }
    }
})();

