/**
 * Created by cage on 3/17/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app,userModel){
    var auth = authorized;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin",             loggedin);
    app.post("/api/assignment/user",                register);
    app.post("/api/assignment/createUser",  auth,   createUser);
    app.get("/api/assignment/user",         auth,   findAllUsers);
    app.get("/api/assignment/user/:id",             findUserById);
    app.get("/api/assignment/username/:username",   findUserByName);
//    app.post("/api/assignment/user?username=username&password=password", findUserByCredential);
    //I used login instead
    app.put("/api/assignment/user/:id",    auth,    updateUser);
    app.delete("/api/assignment/user/:id", auth,    deleteUser);
    app.post("/api/assignment/logout",              logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        console.log(username,password);
        userModel
            .findUserByCredentials({username:username,password:password})
            .then(
                function(user){
                    if(!user){
                        return done(null,false);
                    }
                    return done(null,user);
                },
                function(err){
                    if(err){
                        return done(err);
                    }
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req,res){
        var user = req.user;
        res.json(user);
    }

    function loggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req,res){
        console.log("register server invoked");
        var Newuser = req.body;
        Newuser.roles = ['student'];
        console.log(req.body);
        userModel.findUserByUsername(Newuser.username)
            .then(function(doc){
                if(doc){
                    res.json(null);
                }else{
                    return userModel.createUser(Newuser);
                }},
                function (err){
                 res.status(400).send(err);
                }
            )
            .then(function(doc){
                if(doc){
                    req.login(doc,function(err){
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(doc);
                        }
                    })
                }
            },
            function(err){
               res.status(400).send(err);
            });
    }


    function findAllUsers(req,res){
        if(isAdmin(req.user)){
            userModel.findAllUser()
                .then(function(doc){
                        console.log("alluser");
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }else{
            res.send(401);
        }

    }

    function findUserById(req,res){
        var userid = req.params.id;
        console.log(userid);
        var user = null;
        userModel.findUserById(userid)
            .then(function(doc){
                //console.log(user,userid);
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            });
    }

    function findUserByName(req,res){
        var username = req.params.username;
        console.log(username);
        var user = null;
        userModel.findUserByUsername(username)
            .then(function(doc){
                user = doc;
                console.log(user,username);
                res.json(user);
            },function(err){
                res.status(400).send(err);
            });
    }

    function updateUser(req,res){
        var userid = req.params.id;
        var user = req.body;
        console.log("New user received!",user);
        userModel.updateUser(userid,user)
            .then(function(doc){
                console.log("server send",doc);
                return userModel.findUserById(userid);
            },function(err){
                res.status(400).send(err);
            })
            .then(function(user,error){
                if(user){
                    console.log("updated"+user);
                    req.session.currentUser = user;
                    res.json(user);}
                else
                    res.status(400).send(error);
            });
    }

    function deleteUser(req,res){
        if(isAdmin(req.user)){
            var userId = req.params.id;
            userModel.deleteUser(userId)
                .then(function(doc){
                    res.send(200);
                },function(err){
                    res.status(400).send(err);
                });
        }else{
            res.send(402);
        }

    }

    function createUser(req,res){
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1){
            newUser.roles = newUser.roles.split(",");
        }
        userModel.findUserByName(newUser.username)
            .then(function(user){
                if(!user){
                    return userModel.createUser(newUser)
                    .then(function(){
                        return userModel.findAllUsers();
                    },function(err){
                        res.status(400).send(err);
                    });
                }else{
                    return userModel.createUser(newUser);
                }},
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(function(users){
                res.json(users);
            },function(err){
                res.status(400).send(err);
            })
    }

    function logout(req,res){
        req.logout();
        res.send(200);
    }

    function isAdmin(user){
        if(user.roles.indexOf('admin') >= 0){
            return true;
        }
        return false;
    }

}