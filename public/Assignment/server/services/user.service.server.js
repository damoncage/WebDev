/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app,userModel){
    app.post("/api/assignment/login",login);
    app.get("/api/assignment/loggedin",loggedin);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id",findUserById);
    app.get("/api/assignment/username/:username", findUserByName);
//    app.post("/api/assignment/user?username=username&password=password", findUserByCredential);
    //I used login instead
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout",logout);

    function login(req,res){
        var user = req.body;
        console.log("login",user);
        userModel.findUserByCredentials(user)
            .then(function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(err){
                res.status(400).send(err);
            });
    }

    function loggedin(req,res){
        res.json(req.session.currentUser);
    }

    function register(req,res){
        console.log("register server invoked");
        var user = req.body;
        console.log(req.body);
        userModel.createUser(user)
            .then(function(doc){
                req.session.currentUser = doc;
                res.json(doc);
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

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }
}