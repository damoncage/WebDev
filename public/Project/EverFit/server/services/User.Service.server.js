/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/EverFit/login", login);
    app.get("/api/project/EverFit/loggedin", loggedin);
    app.post("/api/project/EverFit/logout", logout);
    app.post("/api/project/EverFit/register", register);
    app.get("/api/project/EverFit/profile/:userId", profile);

    function login(req,res){
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
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
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function profile(req,res){
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

}