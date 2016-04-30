/**
 * Created by cage on 3/9/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .controller("locationController",locationController)
    function locationController() {
        var map;
        var cm = this;
        cm.show = show;

        function show(dist){
            console.log(dist);
        }
    }
})();