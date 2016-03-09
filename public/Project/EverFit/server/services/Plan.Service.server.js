/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/user/plan",userLikesPlan);

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
}