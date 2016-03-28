/**
 * Created by cage on 3/8/16.
 */
var FitPlans = require("./fitplan.mock.json")
module.exports = function(){
    var api = {
        findPlanByID: findPlanByID,
        findPlanByIds: findPlanByIds,
        findPlanByName:findPlanByName,
        createPlan: createPlan,
        userLikesPlan:userLikesPlan
    };
    return api;

        function findPlanByID(planID){
            for (var p in FitPlans){
                if(FitPlans[p]._id == planID){
                    console.log(FitPlans[p]);
                    return FitPlans[p];
                }
            }
        return null;
        }

        function findPlanByIds(planIds){
            var plans = [];
            if (!planIds){
                return FitPlans;
            }
            for(var p in planIds)
            {
                var plan = findPlanByID(planIds[p]);
                if(plan){
                    plans.push(plan);
                        /*{
                            _id: plans._id,
                            planName: plans.planName,
                            Trainer: plans.Trainer,
                            Description: plans.Description
                        }*/
                }
            }
            return plans;
        }

            function createPlan(plan){
                plan = {
                  _id: "ID_" + (new Date()).getTime(),
                    planName:plan.planName,
                    Trainer: plan.Trainer,
                    Description:plan.Description
                };
                FitPlans.push(plan);
                return plan;
            }

    function findPlanByName(planName){
        console.log("findname",planName);
        var plans = [];
        if(planName == -1){
//            console.log("return all")
            return FitPlans;}
        for(var u in FitPlans){
            if(FitPlans[u].planName.indexOf(planName) > -1){
                plans.push(FitPlans[u]);
            }
        }
        return plans;
    }

    function userLikesPlan(user,planId){
        var tmp = null;
        var FitPlan = findPlanByID(planId);
        if(!FitPlan || !user)
           return error;
        if(!FitPlan.like){
            FitPlan.like = [];
        }
        for(var u in FitPlan.like){
            if (FitPlan.like[u] == user._id){
            console.log("delete ",u,user._id);
                 tmp = u;}
        }
        if(!tmp){
            FitPlan.like.push(user._id);
        }else{
            FitPlan.like.splice(tmp,1);
        }
        tmp = null;
        if(!user.like){
            user.like = [];
        }
        for(var u in user.like){
            if (user.like[u] == planId){
                tmp = u;
            }
        }
        if(tmp){
            user.like.splice(tmp,1);
        }else {
            user.like.push(planId);
        }
        console.log("Returns: ",user);
        console.log(FitPlan,"\n plan");
        return user;
    }

}