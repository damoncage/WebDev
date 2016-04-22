/**
 * Created by cage on 3/30/16.
 */
module.exports = function(mongoose) {
        // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        roles:{type:String,enum:["user","trainer"]},
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        "follow":[{_id:String,username:String}],
        "follower":[{_id:String,username:String}],
        "blogs":[String],
        "plans":[{_id:String,planName:String}]
    }, {collection: 'Everfit.user'});
    return UserSchema;
};