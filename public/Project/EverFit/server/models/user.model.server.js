/**
 * Created by cage on 3/8/16.
 */
var mock = require("./user.mock.json");

module.exports = function(app){
    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        findAllUsers: findAllUsers
    };
    return api;

    function findUsersByIds(userIds){
        var users = [];
        for (var u in userIds){
            var user = findUserById(userIds[u]);
            if(user){
                users.push(
                    {
                        username: user.username,
                        _id: user._id
                    });
            }
        }
    return users;
    }

    function findUserById(userId){
        for(var u in mock){
            if(userId == mock[u]._id)
                return mock[u];
        }
        return null;
    }

    function createUser(user){
        if(findUserByCredentials(user))
        return null;
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        console.log(user+"\t created",mock);
        return user;
    }

    function findUserByCredentials(credentials){
        console.log("findUser");
        for(var u in mock){
            if(mock [u].username === credentials.username
            && mock[u].password === credentials.password)
            return mock[u];
        }
        return null;
    }

    function findAllUsers(){
        return mock;
    }

}