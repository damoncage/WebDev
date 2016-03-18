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
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
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
            return $http.post("/api/assignment/user?username=username&password=password",user);
        }

        function findAllUsers(){
            return model.Users;
        }

        function createUser(user){
            US = JSON.stringify(user);
            console.log("user.service.client", US);
            return $http.post("/api/assignment/user", US);
        }

        function deleteUserById(id){
            for(var u in model.Users){
                if(id == model.Users[u]._id)
                {
                    var index = model.Users.indexOf(user);
                    model.Users.splice(index, 1)};
            }
            return model.Users[u];
        }

        function updateUser(userId,user){
            for(var u in model.Users)
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
                return null;
            }
        }
})();