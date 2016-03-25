/**
 * Created by cage on 3/8/16.
 */
var FitPlans = require("./fitplan.mock.json")
module.exports = function(){
    /*var FitPlans = [
        {
            _id: "123",
            planName: "Beginner's Bodybuilding",
            Trainer: "Jeff Seid",
            Description:"DUMBBELL BENCH PRESS \n LAT PULLDOWN \n OVERHEAD DUMBBELL PRESS \n LEG PRESS \n LYING LEG CURL"
        },
        {
            _id: "233",
            planName: "Arnold Schwarzenegger's blueprint",
            Trainer: "Jhon Reese",
            Description:"There's a legend behind every legacy. " +
            "There's a blueprint behind every legend. This is Arnold Schwarzenegger's " +
            "blueprint—his workout program, nutrition plan, training philosophy, history, knowledge, " +
            "thoughts on motivation, and more. This is your map to success. " +
            "Learn from the best bodybuilder of all time and build your own legacy."
        }
    ]*/

    var api = {
        findPlanByID: findPlanByID,
        findPlanByIds: findPlanByIds,
        createPlan: createPlan
    };
    return api;

        function findPlanByID(planID){
            for (var p in FitPlans){
                if(FitPlans[p]._id == planID)
                return FitPlans[p];
            }
        return null;
        }

        function findPlanByIds(planIds){
            var plans = [];
            for(var p in planIds)
            {
                plans = findPlanByID(planIds[p]);
                if(plans){
                    plans.push(
                        {
                            _id: plans._id,
                            planName: plans.planName,
                            Trainer: plans.Trainer,
                            Description: plans.Description
                        });
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
}