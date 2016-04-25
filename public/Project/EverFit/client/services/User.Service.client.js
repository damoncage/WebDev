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
            findUserByUsername:findUserByUsername,
            getUserById: getUserById,
            updateUser:updateUser,
            deleteUserById: deleteUserById,
            followUser:followUser
        };
        return api;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $http.get("/api/project/EverFit/loggedin");
        }

        function findUserByUsername(username){
            return $http.get("/api/project/EverFit/user/"+username);
        }

        function register(user){
            return $http.post("/api/project/EverFit/register", user);
        }

        function logout(){
       //     console.log("userservice");
            return $http.post("/api/project/EverFit/logout");
        }

        function getUserById(userId){
            return $http.get("/api/project/EverFit/")
        }


        function login(user){
        //    console.log("login client service " + user.username + user.password);
            return $http.post("/api/project/EverFit/login", user);
        }

        function updateUser(userId,user){
            console.log("update"+user);
            return $http.put("/api/project/EverFit/profile/"+userId, user);
        }

        function deleteUserById(id){
            return $http.delete("/api/assignment/user/"+id);
        }

        function followUser(userId,target){
            return $http.post("/api/project/EverFit/profile/"+userId,target);
        }
    }
})();