/**
 * Created by cage on 2/21/16.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController)
function SidebarController($scope,$location){
    $scope.$location = $location
    console.log($location.url)
}
})();