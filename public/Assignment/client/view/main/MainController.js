/**
 * Created by cage on 2/25/16.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController)
    function MainController($scope,$location){
        $scope.$location = $location;
    }
})();