/**
 * Created by cage on 3/17/16.
 */
var mock = require("./user.mock.json");

module.exports = function(app){
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    }
    return api;

    function findUserByUsername(username){
        for(var i in mock){
            if(mock[i].username){
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i in mock) {
            if (mock[i].username === credentials.username &&
                mock[i].password === credentials.password) {
                return mock[i];
            }
        }
        return null;
    }

    function createUser(user){
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function findAllUser(){
        return mock;
    }

    function findUserById(userId){
        for (var i in mock) {
            if (mock[i]._id === userId)
                return mock[i];
        }
        return null;
    }

    function updateUser(user,update){
        for (var i in mock) {
            if (mock[i]._id === user._id) {
                mock[i] = update;
                return mock[i];
            }

        }
        return null;
    }

    function deleteUser(userId){
    for(var u in mock){
        if(userId == mock[u]._id)
        {
            var index = model.Users.indexOf(mock[u]);
            model.Users.splice(index, 1);
        }
    }
    return model.Users[u];
    }
}
