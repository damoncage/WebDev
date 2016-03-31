/**
 * Created by cage on 3/31/16.
 */
/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;*/
module.exports = function(mongoose){
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type:String,enum:["TEXT","TEXTAREA","EMAIL","PASSWORD","OPTIONS","DATE","RADIOS","CHECKBOXES"]},
        placeholder: String,
        options: [{label:String,value:String}]
        },{collection:"Assignment.field"}
    );
    return FieldSchema;
}