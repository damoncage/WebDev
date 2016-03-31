/**
 * Created by cage on 2/25/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl: "view/home/home.view.html",
                    resolve:{
                        getLoggedIn:getLoggedIn
                    }
                })
                .when("/admin",{
                    templateUrl:"view/admin/admin.view.html",
                    resolve:{
                        checkLoggedIn:checkLoggedIn
                    }
                })
                .when("/forms",{
                    templateUrl:"view/forms/forms.view.html",
                    controller:"FormController",
                    resolve:{
                        getLoggedIn:getLoggedIn
                    }
                })
                .when("/fields",{
                    templateUrl:"view/forms/fields.view.html",
                    resolve:{
                        checkLoggedIn:checkLoggedIn
                    }
                })
                .when("/login",{
                    templateUrl:"view/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",{
                    templateUrl:"view/users/profile.view.html",
                    controller: "ProfileController",
                    resolve:{
                        checkLoggedIn:checkLoggedIn
                    }
                })
                .when("/register",{
                    templateUrl:"view/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs:"rm"
                })
                .when("/form/:formId/fields",{
                    templateUrl:"view/forms/fields.view.html",
                    controller:"FieldController",
                    controllerAs:"FM",
                    resolve:{
                        checkLoggedIn:checkLoggedIn
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
