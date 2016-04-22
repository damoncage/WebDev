/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel) {
    app.post("/api/project/EverFit/login", login);
    app.get("/api/project/EverFit/loggedin", loggedin);
    app.post("/api/project/EverFit/logout", logout);
    app.post("/api/project/EverFit/register", register);
    app.get("/api/project/EverFit/user/:userName", findUserByUsername);
    app.get("/api/project/EverFit/userId/:userId", findUserById);
    app.post("/admin/project/EverFit/Users", findUsers);
    app.put("/api/project/EverFit/profile/:userId", updateUser);
    app.delete("/api/project/EverFit/profile/:userId", deleteUser);

    function login(req, res) {
        console.log("login server service " + req.body);
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
                });
//        console.log("server side"+user.username);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function register(req, res) {
        console.log("register server service");
        var user = req.body;
        userModel.createUser(user)
            .then(function (response) {
                    req.session.currentUser = response;
                    console.log("user \n", response);
                    res.json(user);
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
                    res.json(result);
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
                    req.session.currentUser = doc;
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
}