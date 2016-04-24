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
        dm.reviewReply = reviewReply;
        dm.deleteReply = deleteReply;
        dm.message = null;
        dm.change = null;
        dm.modify = modify;
        dm.editReply = editReply;
        dm.userLikesPlan = userLikesPlan;
        dm.favorite = favorite;

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
               review.date = new Date();
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
                            console.log(response.data);
                        }else{
                            dm.message = 'Fail to delete comment, try again later.'
                        }
                    });
            } else
                $location.url("/login");
        }

        function reviewReply(reply,review){
            console.log("reply");
            var planId = $routeParams.planId;
            if($rootScope.currentUser){
                reply.username = $rootScope.currentUser.username;
                reply.date = new Date();
                reply.to = review.username;
                PlanService.reviewReply(reply,review._id,planId)
                    .then(function(response){
                        if(response.data){
                            dm.plan.reviews = response.data;
                            dm.subReply = null;
                            dm.reply=null;
                        }else{
                            dm.message = 'Fail to reply comment, try again later.'
                        }
                    });
            }else
                $location.url("/login");
        }

        function deleteReply(review,reply) {
            var planId = $routeParams.planId;
            if ($rootScope.currentUser.username == reply.username) {
                PlanService.deleteReply(planId,review._id,reply._id)
                    .then(function(response){
                        if(response.data){
                            dm.plan.reviews = response.data;
                            console.log(response.data);
                        }else{
                            dm.message = 'Fail to delete comment, try again later.'
                        }
                    });
            }else{
                $location.url("/login");
            }
        }

        function modify(review){
            dm.change = {
                _id : review._id,
                username:review.username,
                content : review.content
            };
            console.log("modify",dm.change,review);
            return;
        }

        function editReply(change,review){
            var planId = $routeParams.planId;
            if(change._id==review._id){
                if ($rootScope.currentUser.username == review.username) {
                        PlanService.editReply(planId,0,change)
                            .then(function(response){
                                if(response.data){
                                    dm.plan.reviews = response.data;
                                }else{
                                    dm.message = 'Fail to edit comment, try again later.'
                                }
                            });
                }else{
                    $location.url("/login");
                }
        }else{
            if($rootScope.currentUser.username == change.username){
                PlanService.editReply(planId,review._id,change)
                    .then(function(response){
                        if(response.data){
                            dm.plan.reviews = response.data;
                        }else{
                            dm.message = 'Fail to edit reply, try again later.'
                        }
                    });
            }else{
                $location.url("/login");
            }

        }
    }

        function userLikesPlan(planId){
            if(!$rootScope.currentUser){
                $location.url("/login");
                return;
            }
            var user = {
                _id:$rootScope.currentUser._id,
                username:$rootScope.currentUser.username
            }
            PlanService
                .userLikesPlan(user,planId)
                .then(function(response){
                    if(response.data)
                    return UserService.getCurrentUser();
                })
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });
        }

        function favorite(){
            if(dm.plan.follower.map(function(e){return e._id;}).indexOf($rootScope.currentUser._id)!= -1)
                return true;
            else
                return false;
        }
    }
})();

