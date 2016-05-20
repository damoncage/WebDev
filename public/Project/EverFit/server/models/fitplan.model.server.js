/**
 * Created by cage on 3/8/16.
 */
var FitPlans = require("./fitplan.mock.json")
var q = require('q');

module.exports = function(db,mongoose){

    var planSchema = require("./plan.schema.js")(mongoose);
    var planModel = mongoose.model('plan',planSchema);

    var api = {
        findPlanByID: findPlanByID,
        findPlanByIds: findPlanByIds,
        findPlanByName:findPlanByName,
        findPlanByTrainer:findPlanByTrainer,
        createPlan: createPlan,
        userLikesPlan:userLikesPlan,
        updatePlan:updatePlan,
        removePlan:removePlan,
        addPlanReview:addPlanReview,
        deleteReview:deleteReview,
        reviewReply:reviewReply,
        deleteReply:deleteReply,
        editReply:editReply
    };
    return api;


    function findPlanByID(planID){
        return planModel.findById(planID);
    }

    function findPlanByIds(planIds){
        for(var i in planIds)
        {
            planIds[i] = new ObjectId(planIds[i]);
        }
        return planModel.find({_id:{$in:planIds}});
    }

    function findPlanByName(planName){
        if(planName=='-1'){
            return planModel.find();
        }
        return planModel.find({planName:{$regex:planName,$options:'i'}});
    }

    function findPlanByTrainer(trainer){
        return planModel.find({trainer:{$regex:trainer, $options:'i'}});
    }

    function createPlan(plan){
       return planModel.create(plan);
    }

    function userLikesPlan(user,planId){
        var deferred = q.defer();
        planModel.findById(planId,function(err,doc){
            if(err){
                deferred.reject(err);
            }else if(doc){
                var plan = {
                    _id:doc._id.toString(),
                    planName:doc.planName
                }
                var Tplan = doc.follower.id(user._id);
               if(Tplan){
                   Tplan.remove();
               }else{
                   doc.follower.push(user);
               }
                doc.save();
                deferred.resolve(plan);
            }
        });
        return deferred.promise;
    }

    function updatePlan(planId,plan){
        var deferred = q.defer();
        delete plan._id;
        planModel.update({_id:planId},{$set:plan},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc)
                }
        });
        return deferred.promise;
    }

    function removePlan(planId){
        return planModel.remove({_id:planId});
    }

    function addPlanReview(planId,review){
        var deferred = q.defer();
        planModel.findById(planId)
            .then(function(doc){
                if(doc){
                    doc.reviews.push(review);
                    doc.save();
                    deferred.resolve(doc);
                }else{
                    deferred.reject(400);
                }
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function deleteReview(planId,reviewId,userId){
        var deferred = q.defer();
        planModel.findById(planId)
            .then(function(doc){
                if(doc){
                    var tmpReview = doc.reviews.id(reviewId);
                    if(tmpReview.userId == userId){
                        tmpReview.remove();
                        doc.save();
                        deferred.resolve(doc);
                    }else{
                        deferred.reject(400);
                    }
                }else{
                    deferred.reject(400);
                }
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function reviewReply(planId,reviewId,reply){
        var deferred = q.defer();
        planModel.findById(planId)
            .then(function(doc){
                if(doc){
                    var tmp = doc.reviews.id(reviewId);
                    tmp.reply.push(reply);
                    doc.save();
                    deferred.resolve(doc);
                }else{
                    deferred.reject(null);
                }
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function deleteReply(planId,reviewId,replyId){
        var deferred = q.defer();
        planModel.findById(planId)
            .then(function(doc){
                if(doc){
                    var tmp = doc.reviews.id(reviewId);
                    var tmpR = tmp.reply.id(replyId);
                    tmpR.remove();
                    doc.save();
                    deferred.resolve(doc);
                }else{
                    deferred.reject(null);
                }
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function editReply(planId,reviewId,change){
        var deferred = q.defer();
        planModel.findById(planId)
            .then(function(doc){
                if(doc){
                    if(reviewId == 0){
                        var tmp = doc.reviews.id(change._id);
                        tmp.content = change.content;
                        doc.save();
                        deferred.resolve(doc);
                    }else{
                        var tmp = doc.reviews.id(reviewId);
                        var tmpR = tmp.reply.id(change._id);
                        tmpR.content = change.content;
                        doc.save();
                        deferred.resolve(doc);
                    }
                }else{
                    deferred.reject(null);
                }
            },function(err){
                deferred.reject(err);
            });
        return deferred.promise;
    }

}