/**
 * Created by cage on 3/8/16.
 */
var passportFit = require('passport');
var FitLocalStrategy = require('passport-local').Strategy;

module.exports = function(app, planModel, userModel){
    app.post("/api/project/plans",findPlanByIds);
    app.get("/api/project/plan/detail/:planId",findPlanById);
    app.get("/api/project/plan/:planName",findPlanByName);
    app.post("/api/project/user/plan/:planId",  fitAu,    userLikesPlan);
    app.post("/api/api/project/plan",           fitAu, isTrainer, createPlan);
    app.put("/api/project/plan/:planId",        fitAu, isTrainer, updatePlan);
    app.delete("/api/project/plan/:planId",     fitAu, isTrainer, removePlan);
    app.post("/api/project/plan/:planId/review", fitAu,           addReview);
    app.delete("/api/project/plan/:planId/review/:reviewId",fitAu,          deleteReview);
    app.post("/api/project/plan/:planId/review/:reviewId", fitAu ,reviewReply);

    var fitAut = fitAu;
    var isTrainer = isTrainer;

    function fitAu(req,res,next){
        if(!req.isAuthenticated()){
            res.send(401);
        }else{
            next();
        }
    }

    function isTrainer(req,res,next){
        if(req.user.roles.indexOf('trainer') >= 0){
            next();
        }else{
            res.send(401);
        }
    }

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
            .then(function(doc){
                res.send(doc);
            },function(err){
                res.status(400).send(err);
            });
    }

    function addReview(req,res) {
        var review = req.body;
        var planId = req.params.planId;
        planModel.addPlanReview(planId, review)
            .then(function (doc) {
                if (doc) {
                    res.json(doc.reviews);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(402).send(err);
            });
    }

    function deleteReview(req,res){
        var reviewId = req.params.reviewId;
        var planId = req.params.planId;
        console.log("delete Review===========",reviewId,"===========",planId);
        planModel.deleteReview(planId,reviewId,req.user._id)
            .then(function(doc){
                if(doc){
                    res.json(doc.reviews);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(402).send(err);
            });
    }

    function reviewReply(req,res){
        var planId = req.params.planId;
        var reviewId = req.params.reviewId;
        var reply = req.body;
        planModel.reviewReply(planId,reviewId,reply)
            .then(function (doc) {
                if (doc) {
                    res.json(doc.reviews);
                } else {
                    res.send(400);
                }
            }, function (err) {
                res.status(402).send(err);
            });
    }

}