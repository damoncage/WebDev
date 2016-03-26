/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/EverFit/login", login);
    app.get("/api/project/EverFit/loggedin", loggedin);
    app.post("/api/project/EverFit/logout", logout);
    app.post("/api/project/EverFit/register", register);
    app.post("/api/project/EverFit/profile", getUserProfile);
    app.get("/admin/project/EverFit/Users",adminFindAll);

    function login(req,res){
        console.log("login server service " + req.body);
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
//        console.log("server side"+user.username);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req,res){
        res.json(req.session.currentUser);
    }


    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function register(req,res){
        var user = req.body;
        console.log("user \n",user);
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function getUserProfile(req,res){
        var user = req.body;
        var result = userModel.findUserByCredentials(user);
        console.log("server side"+ user.username,req.body.username);
        res.json(result);
    }

    function adminFindAll(req,res){
        res.json(userModel.findAllUsers());
    }

}