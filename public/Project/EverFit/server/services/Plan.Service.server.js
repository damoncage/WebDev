/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app, planModel, userModel){
    app.post("/api/project/plans",findPlanByIds);
    app.get("/api/project/plan/detail/:planId",findPlanById);
    app.get("/api/project/plan/:planName",findPlanByName);
    app.post("/api/project/user/plan/:planId",userLikesPlan);
    app.post("/api/api/project/plan",createPlan);
    app.put("/api/project/plan/:planId",updatePlan);
    app.delete("/api/project/plan/:planId",removePlan);

    function findPlanByIds(req,res){
        var planIds = req.body;
        planModel.findPlanByIds(planIds)
            .then(function(plans){
                res.json(plans);
            },function(err){
                res.status(400).send(err);
            });
    }

    function findPlanById(req,res){
        var planId = req.params.planId;
        console.log(planId);
        planModel.findPlanByID(planId)
            .then(function(plan){
            res.json(plan);
            },function(err){
            res.status(400).send(err);
        });
    }

    function findPlanByName(req,res){
        var planName = req.params.planName;
       planModel.findPlanByName(planName)
            .then(function(planName){
                res.json(planName);
            },function(err){
                res.status(400).send(err);
            });
    }

    function userLikesPlan(req,res){
        var planId = req.params.planId;
        var user = req.body;
        planModel.userLikesPlan(user,planId)
            .then(function(plan){
                return userModel.userLikesPlan(user._id,plan);
            },function(err){
                res.status(400).send(err);
            })
            .then(function(user){
                req.session.currentUser = user;
                res.json(user);
            },function(err){
                res.status(400).send(err);
            });
    }

    function createPlan(req,res){
        var plan = req.body;
        planModel.createPlan(plan)
            .then(function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            })
    }

    function updatePlan(req,res){
        var planId = req.params.planId;
        var plan = req.body;
        planModel.updatePlan(planId,plan)
            .then(function(plan){
                res.send(plan);
            },function(err){
                res.status(400).send(err);
            });
    }

    function removePlan(req,res){
        var planId = req.params.planId;
        planModel.removePlan(planId)
            .then(function(plan){
                res.send(plan);
            },function(err){
                res.status(400).send(err);
            });
    }

}