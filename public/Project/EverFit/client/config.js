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
                templateUrl: "views/home/home.view.html",
                controller: "homeController",
                controllerAs:"model",
                resolve:{
                    getLoggedIn:getLoggedIn
                }
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
            .when("/fitplans/:PlanName",{
                templateUrl:"views/FitPlans/fitplans.view.html",
                controller:"fitPlanController",
                controllerAs:"model",
                resolve:{
                    getLoggedIn:getLoggedIn
                }
            })
            .when("/friends",{
                templateUrl:"views/location/location.view.html",
                controller:"locationController",
                controllerAs:"mm",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/profile",{
                templateUrl:"views/profile/profile.view.html",
                controller:"ProfileController",
                resolve:{
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function getLoggedIn(UserService, $q){
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response){
               var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService,$q, $location){
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                if(currentUser){
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                }else{
                    $location.url("/login");
                    deferred.reject();
                }
            });
        return deferred.promise;
    }
})();