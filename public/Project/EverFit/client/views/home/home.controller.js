/**
 * Created by cage on 3/26/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("homeController",homeController);

    function homeController($location,UserService,PlanService){
        var model = this;
        model.searchPlanByName = searchPlanByName;

        function searchPlanByName(PlanName){
            console.log();
            $location.url("/fitplans/"+PlanName)
        }
    }
})();