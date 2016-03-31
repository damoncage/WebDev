/**
 * Created by cage on 3/17/16.
 */
var mock = require("./user.mock.json");
var q = require("q");
module.exports = function(db,mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('FormUser', UserSchema);


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

    function findUserByUsername(username) {
        return UserModel.find({username: username});
        /* var deferred = q.defer();
         UserModel.find({username: 'cage'},function(err,doc){
         if(err){
         deferred.reject(err);
         }else{
         deferred.resolve(doc);
         console.log("find model",doc[0]);
         }
         });
         return deferred.promise;*/
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        /* user._id = "ID_" + (new Date()).getTime();
         mock.push(user);
         return user;*/
    }

    function findAllUser() {
        return UserModel.find();
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, update) {
        var deferred = q.defer();
        delete update._id;
        UserModel.update({_id: userId}, {$set: update},
            function (err, update) {
                if (!err) {
                    deferred.resolve(update);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
}
