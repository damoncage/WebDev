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
                templateUrl: "views/register/register.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();