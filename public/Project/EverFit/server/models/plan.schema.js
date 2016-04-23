module.exports = function(mongoose){
    var reviewSchema = require("./review.schema.js")(mongoose);
    var planSchema = mongoose.Schema(
        {
            planName:String,
            trainer:String,
            follower:[{_id:String, username:String}],
            description:String,
            content:String,
            reviews:[reviewSchema]
        },{collection:"Everfit.plan"});
    return planSchema;
}