/**
 * Created by cage on 3/8/16.
 */
var mock = require("./user.mock.json");
var q = require("q");

module.exports = function(db,mongoose){
    var UserSchema = require("./user.schema.server.js")(mongoose);
    // create user model from schema
    var UserModel = mongoose.model('User',UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        userLikesPlan:userLikesPlan,
        followUser:followUser
    };
    return api;

    function findUsersByIds(userIds){
        for (var u in userIds){
            userIds[u] = new ObjectId(userIds[u])
        }
        return UserModel.find({_id:{$in:userIds}});
    }

    function findUserByUsername(username){
        return UserModel.findOne({username:username});
    }

    function findUserById(userId){
        return UserModel.findById(userId);
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

        /* if(findUserByCredentials(user))
        return null;
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        console.log(user+"\t created",mock);
        return user;*/
    }

    function findUserByCredentials(credentials){
       return UserModel.findOne({username:credentials.username,password:credentials.password});
    }

    function findAllUsers(){
        return UserModel.find();
    }

    function updateUser(userId,update){
        var deferred = q.defer();
        delete update._id;
        UserModel.update({_id:userId},{$set:update},
        function(err,doc){
            if(err){
                deferred.reject(err);
            }else
            deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function deleteUser(userId){
        return UserModel.remove({_id:userId});
    }

    function userLikesPlan(userId,plan){
        var deferred = q.defer();
        UserModel.findById(userId)
            .then(function(user){
                var Tplan = user.plans.id(plan._id);
                if(Tplan){
                    Tplan.remove();
                }else{
                    user.plans.push(plan);
                }
                user.save();
                deferred.resolve(user);
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function followUser(userId,target){
        var deferred = q.defer();
        var username = null;
        var index = null;
        UserModel.findById(userId)
            .then(function(user){
                if(user){
                    username = user.username;
                    index = user.follow.map(function(e){return e._id}).indexOf(target._id);
                    if(index == -1){
                        user.follow.push(target);
                        user.save();
                        return UserModel.findById(target._id);
                    }else{
                        user.follow[index].remove();
                        user.save();
                        return UserModel.findById(target._id);
                    }
                }else
                    deferred.reject(400);
            },function(err){
                deferred.reject(err);
            })
            .then(function(target){
                if(index==-1){
                    target.follower.push({_id:userId,username:username});
                    target.save();
                }else{
                    target.follower.id(userId).remove();
                    target.save();
                }
                deferred.resolve(target);
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

};