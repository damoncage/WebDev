/**
 * Created by cage on 2/27/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService ($rootScope,$http){
        var model = {
            //declare all functions

            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            register:register,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            adminUpdate: adminUpdate,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout:logout
        };
        return model;

        //function implementations

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function findUserByCredentials(user) {
            console.log(user,"login");
            return $http.post("/api/assignment/login",user);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/username/"+username);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

       function createUser(user){
           return $http.post("/api/assignment/admin/createUser",user);
       }

        function register(user){
            console.log("user.service.client", user);
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(id){
           return $http.delete("/api/assignment/admin/user/"+id);
        }

        function updateUser(userId,user){
            console.log("update",user);
            return $http.put("/api/assignment/user/"+userId,user);
            /*for(var u in model.Users)
            {
                if(model.Users[u]._id == userId)
                {
                    model.Users[u].firstName = user.firstName;
                    model.Users[u].lastName = user.lastName;
                    model.Users[u].username = user.username;
                    model.Users[u].password = user.password;
                    }
                    return  model.Users[u];
                }
                return null;*/
            }
        function adminUpdate(user){
            return $http.put("/api/assignment/admin/user/"+user._id,user);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }
        }
})();
