/**
 * Created by cage on 2/27/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService ($rootScope){
        var model = {
         Users: [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password){
            for(user in model.Users){
                if(user.username == username && user.password == password)
                return user;
            }
            return null;
        }

        function findAllUsers(){
            return model.Users;
        }

        function createUser(user){
            var newuser = {
                username: user.username,
                password: user.password,
                _id: (new Date).getTime(),
            };
            model.Users.push(newuser);
            return newuser;
        }

        function deleteUserById(id){
            for(user in model.Users){
                if(id == user._id)
                {
                    var index = model.Users.indexOf(user);
                    model.Users.splice(index, 1)};
            }
            return model.Users
        }

        function updateUser(userId,user){
            for(var u in model.Users)
            {
                if(model.Users[u]._id == userId)
                {
                    model.Users[u] = user;
                }
                return  model.Users[u];
            }
        }
    }
})();
