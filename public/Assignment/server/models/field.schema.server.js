/**
 * Created by cage on 3/30/16.
 */

module.exports = function(mongoose){
    var FieldSchema = mongoose.schema({
       label: String,
        type: String,
        placeholder: String,
        options: [{label:String,value:String}]
    },{collection:"Assignment.field"});
return FieldSchema;
};
