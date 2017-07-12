/**
 * Created by cage on 7/11/17.
 */
(function () {
    angular
        .module("cageViews")
        .controller("homePageController", homePageController);

    function homePageController() {
        var hm = this;
        hm.list = [
            {
                _id:'123',
                name:'Better Call Saul'
            },
            {
                _id:'221',
                name:'Breaking Bad'
            }
        ]
    }
})();