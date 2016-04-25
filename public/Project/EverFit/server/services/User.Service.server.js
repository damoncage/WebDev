/**
 * Created by cage on 3/8/16.
 */
var passportFit = require('passport');
var FitLocalStrategy = require('passport-local').Strategy;

module.exports = function(app, planModel, userModel) {

    passportFit.use('fit', new FitLocalStrategy (fitLocalStrategy));
    passportFit.serializeUser(serializeFitUser);
    passportFit.deserializeUser(deserializeFitUser);

    var fitAuth = fitAuth;

    app.post("/api/project/EverFit/login", passportFit.authenticate('fit'), login);
    app.get("/api/project/EverFit/loggedin", loggedin);
    app.post("/api/project/EverFit/logout", logout);
    app.post("/api/project/EverFit/register", register);
    app.get("/api/project/EverFit/user/:userName", findUserByUsername);
    app.get("/api/project/EverFit/userId/:userId", findUserById);
   // app.post("/admin/project/EverFit/Users", findUsers);
    app.put("/api/project/EverFit/profile/:userId",     fitAuth, updateUser);
    app.delete("/api/project/EverFit/profile/:userId",  fitAuth, deleteUser);
    app.post("/api/project/EverFit/profile/:userId", fitAuth,   followUser);

    function fitLocalStrategy(username, password,done){
        userModel.findUserByCredentials({username:username,password:password})
            .then(function(user){
                if(user){
                    return done(null,user);
                }else
                    return done(null,false,{message:'Incorrect username / password!'});
            },function(err){
                return done(err);
            });
    }

    function serializeFitUser(user, done) {
        done(null, user._id);
    }

    function deserializeFitUser(userId, done) {
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function fitAuth(req,res,next){
        if(!req.isAuthenticated()){
            res.send(401);
        }else{
            next();
        }
    }

    function login(req, res) {
        res.json(req.user);
        /*console.log("login server service " + req.body);
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function(user){
                if(user){
                    req.session.currentUser = user;
                    res.json(user);
                }else{
                    res.send(400);
                }},function (err){
                    res.status(400).send(err);
                });*/
//        console.log("server side"+user.username);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated()  ? req.user: null);
    }


    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        console.log("register server service");
        var user = req.body;
        userModel.findUserByUsername(user.username)
            .then(function(doc){
                if(doc){
                    res.send(400);
                }else{
                    return userModel.createUser(user);
                }
            },function(err){
                res.status(401).send(err);
            })
            .then(function (user) {
                if(user){
                    req.login(user, function(err){
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(user);
                        }
                    });
                    console.log("user \n", user);
                }
                },
                function (err) {
                    res.status(400).send(err);
                });
        /*      req.session.currentUser = user;
         res.json(user);*/
    }

    function findUserByUsername(req, res) {
        var userName = req.params.userName;
        userModel.findUserByUsername(userName)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else
                    res.json(null);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findUserById(req, res) {
        userModel.findUserById(req.params.userId)
            .then(function (user) {
                if (user) {
                    res.json(result);
                } else
                    res.send(400);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findUsers(req, res) {
        var userIds = req.body;
        userModel.findUsersByIds(userIds)
            .then(function (users) {
                if (users[0]) {
                    res.json(users);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateUser(req, res) {
        var userid = req.params.userId;
        var user = req.body;
        if(typeof user.emails == "string"){
            user.emails = user.emails.split(",");
        }
                console.log("server",user.emails);
        userModel.updateUser(userid, user)
            .then(function (doc) {
                if (doc) {
                    return userModel.findUserById(userid);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function(doc){
                if(doc){
                    res.json(doc);
                }else{
                    res.send(400);
                }
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(function (doc) {
                if (doc) {
                    res.send(doc);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function followUser(req,res){
        var userId = req.params.userId;
        var target = req.body;
        userModel.followUser(userId,target)
            .then(function(target){
                if(target){
                    res.json(target);
                }else{
                    res.send(400);
                }
            },function(err){
                res.status(400).send(err);
            });
    }
}