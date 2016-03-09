/**
 * Created by cage on 3/8/16.
 */
(function(){
    angular
        .module("EverFitApp")
        .factory("UserService",userService);
    function userService($http,$rootScope){
        var api = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile
        };
        return api;

        function getProfile(){
            return $http.get("/api/project/EverFit/profile/" + $rootScope.currentUser._id);
        }

        function register(user){
            return $http.post("/api/project/EverFit/register", user);
        }

        function logout(){
            return $http.post("/api/project/EverFit/logout");
        }

        function getCurrentUser(){
            return $http.get("/api/project/EverFit/loggedin");
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function login(user){
            return $http.post("/api/project/EverFit/login",user);
        }
    }
})();