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
                    templateUrl: "view/home/home.view.html"
                })
                .when("/admin",{
                    templateUrl:"view/admin/admin.view.html"
                })
                .when("/forms",{
                    templateUrl:"view/forms/forms.view.html",
                    controller:"FormController"
                })
                .when("/fields",{
                    templateUrl:"view/forms/fields.view.html"
                })
                .when("/login",{
                    templateUrl:"view/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile",{
                    templateUrl:"view/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/register",{
                    templateUrl:"view/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs:"rm"
                })
                .when("/form/:formId/fields",{
                    templateUrl:"view/forms/fields.view.html",
                    controller:"FieldController",
                    controllerAs:"FM"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        }
})();
