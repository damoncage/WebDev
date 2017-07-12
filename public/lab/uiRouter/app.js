/**
 * Created by cage on 7/11/17.
 */
(function () {
    angular
        .module("cageViews",["ui.router"])
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        var states = [
            {
            name: 'homePage',
            url: '/search',
            templateUrl: "view/homePage.html",
            controller:"homePageController",
            controllerAs:"model"
        },
            {
                name:'homePage.detail',
                url:'/:name',
                views:{
                    detail:{
                        templateUrl: "view/detail.html",
                        controller: function ($scope,$stateParams) {
                            $scope.name = $stateParams.name;
                        }
                    }
                }

            }];

        states.forEach(function (e) {
            $stateProvider.state(e);
        });
        $urlRouterProvider.otherwise('/search');
    }

})();
