/**
 * Created by cage on 3/31/16.
 */
var FieldSchema = require("./field.schema.server.js");
module.exports = function(mongoose){
    var formSchema = mongoose.Schema({
        userId: String,
        title: {type:String,default:"New Form"},
        fields: [FieldSchema],
        created: {type: Date,default:Date.now},
        updated: {type:Date, default:Date.now}
    },{collection:"Assignment.form"});
    return formSchema;
}