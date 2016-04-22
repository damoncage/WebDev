module.exports = function(mongoose){
    var reviewSchema = mongoose.Schema({
        userId:String,
        userName:String,
        content:String,
        reply:[{username:String,content:String}]
    },{collection:"Everfit.review"});
    return reviewSchema;
}