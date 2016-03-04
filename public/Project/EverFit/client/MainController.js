/**
 * Created by cage on 3/3/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("MainController", MainController);

    function MainController($scope,$location){
        $scope.$location = $location;
    }
})();