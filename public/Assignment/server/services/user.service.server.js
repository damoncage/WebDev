/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app,userModel){
 //   app.post("/api/assignment/login",login);
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/user",findUserBycredentials);
    app.get("/api/assignment/alluser", findAllUsers);


    function register(req,res){
        var user = req.body;
        console.log(req.body);
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserBycredentials(req,res){
        console.log("invoked");
        var credentials = req.body;
        console.log(credentials);
        res.send(200);
    }

    function findAllUsers(req,res){
        var user = userModel.findAllUser;
        res.json(user);
    }
}