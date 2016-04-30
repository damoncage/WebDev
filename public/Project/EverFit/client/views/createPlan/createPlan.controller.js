/**
 * Created by cage on 4/27/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("createPlanController", createPlanController)
        .directive('confirmOnExit',function(){
            return {
                link:function($scope,elem,attrs){
                    window.onbeforeunload = function(){
                        if($scope.newPlan.$dirty){
                            return "The plan havn't been saved yet, are you sure to leave the page?";
                        }
                    }
                    $scope.$on('$locationChangeStart',function(event,next,current){
                        if($scope.newPlan.$dirty){
                            if(!confirm("The plan havn't been saved yet, are you sure to leave the page?")){
                                event.preventDefault();
                            }
                        }
                    })
                }
            }
        });

    function createPlanController($scope,$routeParams,PlanService,UserService,$location,$rootScope,$sce){
        var cm = this;
        cm.preview = null;
        cm.view = view;
        cm.discard = discard;
        cm.submit = submit;
        cm.type = null;

        function init(){
            if($routeParams.planId){
                PlanService.findPlanById($routeParams.planId)
                    .then(function(response){
                        if(response.data.trainer==$rootScope.currentUser.username){
                            cm.plan = response.data;
                            cm.type = 'Update Plan';
                        }else{
                         $location.url("/fitplans");
                        }
                    });
            }else{
                cm.type = 'Create New Plan';
            };
        }init();

        function view(){
            cm.preview = {
                planName:cm.plan.planName,
                trainer:cm.plan.trainer,
                description:cm.plan.description,
                content:cm.plan.content
            };
            cm.preview.content = $sce.trustAsHtml(cm.preview.content);
        };

        function discard(){
            window.history.back()
        }

        function submit(plan){
            if(plan._id){
                PlanService.updatePlan(plan)
                    .then(function(response){
                       if(response.data){
                           $scope.newPlan.$setPristine();
                           $location.url("/fitplans/detail/"+plan._id);
                       }else{
                           cm.message = 'Fail to save the change, try again later.';
                       }
                    });
            }else{
                plan.trainer = $rootScope.currentUser.username;
                PlanService.createPlan(plan)
                    .then(function(response){
                        if(response.data){
                            $scope.newPlan.$setPristine();
                            $location.url("/fitplans/detail/"+response.data._id);
                        }else{
                            cm.message = 'Fail to save the change, try again later.';
                        }
                    });
            }

        }
    }


})();
