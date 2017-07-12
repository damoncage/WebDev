/**
 * Created by cage on 7/11/17.
 */
(function () {
    angular
        .module("cageViews",["ui.router"])
        .config(configuration);

    function configuration($stateProvider, $urlRouterProvider) {
        var states = {
            name: 'root',
            url: '/search',
            views:{
                window1:{
                    templateUrl: "view/homePage.html"
                }
            }

        };
        var details = {
                name:'root.detail',
                url:'/:name',
                views:{
                    window2:{
                        template:"Second window starts here"
                    }
                }

            };

        $stateProvider.state(states);
        $stateProvider.state(details);
        $urlRouterProvider.otherwise('/search');
    }

})();
