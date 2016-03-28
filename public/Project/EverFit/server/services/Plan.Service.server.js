/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/plans",findPlanByIds);
    app.get("/api/project/plan/detail/:planId",findPlanById);
    app.get("/api/project/plan/:planName",findPlanByName);
    app.post("/api/project/user/plan/:planId",userLikesPlan);

    function userLikesPlan(req,res){
        var planId = req.params.planId;
        var user = req.body;
        user = planModel.userLikesPlan(user,planId);
        console.log(user);
        if(user){
        userModel.updateUser(user._id,user);
        req.session.currentUser = user;}
        res.send(user);
    }

    function findPlanById(req,res){
        var planId = req.params.planId;
        console.log(planId);
        var plan = planModel.findPlanByID(planId);
        res.json(plan);
    }

    function findPlanByIds(req,res){
        var planIds = req.body;
        var plans = planModel.findPlanByIds(planIds);
        res.json(plans);
    }

    function findPlanByName(req,res){
        var planName = req.params.planName;
 //       console.log(planName);
        var plans = planModel.findPlanByName(planName);
        res.json(plans);
    }
}