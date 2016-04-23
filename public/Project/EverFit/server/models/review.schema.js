module.exports = function(mongoose){
    var reviewSchema = mongoose.Schema({
        userId:String,
        username:String,
        date:{type:Date, default: Date.now},
        content:String,
        reply:[{username:String, to: String, date:{type:Date, default: Date.now},content:String}]
    },{collection:"Everfit.review"});
    return reviewSchema;
}