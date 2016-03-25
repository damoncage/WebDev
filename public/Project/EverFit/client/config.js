/**
 * Created by cage on 3/3/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .config(configure);

    function configure($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/login",{
                templateUrl: "views/Login/login.view.html",
                controller: "loginController",
                controllerAs: "cm"
            })
            .when("/register",{
                templateUrl: "views/register/register.view.html",
                controller:"registerController",
                controllerAs:"model"
            })
            .when("/fitplans",{
                templateUrl:"views/FitPlans/fitplans.view.html"
            })
            .when("/friends",{
                templateUrl:"views/location/location.view.html",
                controller:"locationController",
                controllerAs:"mm"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();