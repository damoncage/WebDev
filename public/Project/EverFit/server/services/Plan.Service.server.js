/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/user/plan",userLikesPlan);
    app.post("/api/project/plans",findPlanByIds);
    app.get("/api/project/plan/detail/:planId", findPlanById);
    app.get("/api/project/plan/:planName",findPlanByName);

    function userLikesPlan(req, res){
        var planId = req.body.planId;
        var userId = req.body.userId;
        var FitPlan = planModel.findPlanById(planId);
        if(!FitPlan.like){
            FitPlan.like = [];
        }
        FitPlan.like.push(userId);
        var user = userModel.findUserById(userId);
        if(!user.like){
            user.like = [];
        }
        user.like.push(planId);
        console.log(user);
        console.log(movie);
        res.send(200);
    }

    function findPlanById(req,res){
        var planId = req.params.planId;
        var plan = planModel.findPlanByID(planId);
        res.json = plan;
    }

    function findPlanByIds(req,res){
        var planIds = req.body;
        var plans = planModel.findPlanByIds(planIds);
        res.json(plans);
    }

    function findPlanByName(req,res){
        var planName = req.params.planName;
        console.log(planName);
        var plans = planModel.findPlanByName(planName);
        res.json(plans);
    }
}