/**
 * Created by cage on 3/17/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app,userModel){
    var auth = authorized;
    var isAdmin = isAdmin;
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin",             loggedin);
    app.post("/api/assignment/user",                register);
    app.post("/api/assignment/admin/createUser",  auth, isAdmin,   createUser);
    app.get("/api/assignment/user",         auth,isAdmin,findAllUsers);
    app.get("/api/assignment/user/:id",             findUserById);
    app.get("/api/assignment/username/:username",   findUserByName);
//    app.post("/api/assignment/user?username=username&password=password", findUserByCredential);
    //I used login instead
    app.put("/api/assignment/user/:id",    auth,    updateUser);
    app.put("/api/assignment/admin/user/:id", auth,isAdmin, adminUpdate);
    app.delete("/api/assignment/admin/user/:id", auth,isAdmin,    deleteUser);
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
            userModel.findAllUser()
                .then(function(doc){
                        console.log("alluser");
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
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
            var userId = req.params.id;
            userModel.deleteUser(userId)
                .then(function(doc){
                    res.send(200);
                },function(err){
                    res.status(400).send(err);
                });
    }

    function createUser(req,res){
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1){
            newUser.roles = newUser.roles.split(",");
        }
        userModel.findUserByUsername(newUser.username)
            .then(function(user){
                if(!user){
                    return userModel.createUser(newUser)
                    .then(function(){
                        res.send(200);
                    },function(err){
                        res.status(400).send(err);
                    });
                }else{
                    res.send(400);
                }},
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function adminUpdate(req,res){
        userModel.adminUpdate(req.body)
            .then(function(doc){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            })
    }

    function logout(req,res){
        req.logout();
        res.send(200);
    }

    function isAdmin(req,res,next){
        if(req.user.roles.indexOf('admin') >= 0){
            next();
        }else{
            res.send(401);
        }

    }

}