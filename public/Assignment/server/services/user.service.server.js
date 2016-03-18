/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app,userModel){
 //   app.post("/api/assignment/login",login);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user:id",findUserById);
    app.get("/api/assignment/user?username=username", findUserByName);
    app.post("/api/assignment/user?username=username&password=password", findUserByCredential);
 /*   app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);*/

    function register(req,res){
        console.log("register server invoked");
        var user = req.body;
        console.log(req.body);
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }


    function findAllUsers(req,res){
        var user = userModel.findAllUser();
        res.json(user);
    }

    function findUserById(req,res){
        var userid = req.params.id;
        var user = null;
        user = userModel.findUserById(userid);
        console.log(user,userid);
        res.json(user);
    }

    function findUserByName(req,res){
        var username = req.params.username;
        console.log(req.params);
        var user = null;
        user = userModel.findUserByUsername(username);
        console.log(user,username);
        res.json(user);
    }

    function findUserByCredential(req,res){
        console.log("invoked");
        var credentials = req.body;
        console.log(credentials);
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }


}