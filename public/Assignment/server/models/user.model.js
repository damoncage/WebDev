/**
 * Created by cage on 3/17/16.
 */
var mock = require("./user.mock.json");
var q = require("q");
module.exports = function(db,mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('FormUser',UserSchema);


    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
    }
    return api;

    function findUserByUsername(username){
        for(var i in mock){
            if(mock[i].username == username){
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        console.log("usermodel");
        for (var i in mock) {
            if (mock[i].username === credentials.username &&
                mock[i].password === credentials.password) {
                return mock[i];
            }
        }
        return null;
    }

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(user,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
       /* user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;*/
    }

    function findAllUser(){
        return mock;
    }

    function findUserById(userId){
        for (var i in mock) {
            if (mock[i]._id == userId)
                return mock[i];
        }
        return null;
    }

    function updateUser(userId,update){
        console.log("model",userId,update);
        for (var i in mock) {
            if (mock[i]._id == userId) {
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
            var index = mock.indexOf(mock[u]);
            mock.splice(index, 1);
        }
    }
    }
}
