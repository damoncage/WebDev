/**
 * Created by cage on 3/31/16.
 */

var q = require('q');
module.exports = function(db,mongoose){
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('field',fieldSchema);
    var api = {
/*        findFormFields:findFormFields,
        findOneFormFields:findOneFormFields,
        deleteFormFieldById:deleteFormFieldById,
        createField:createField,
        updateFormFieldById:updateFormFieldById,
        sortFormFields:sortFormFields*/
    }
    return api;
};
