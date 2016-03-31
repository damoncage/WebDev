/**
 * Created by cage on 3/17/16.
 */
var mock = require("./form.mock.json");
var uuid = require("node-uuid");
var q = require('q');
module.exports = function(db,mongoose){
    var formSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',formSchema);

    var api = {
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,
        createForm: createForm,
        findallForm: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    }
    return api;

    function findFormByTitle(title){
        return FormModel.find({title:title});
    }

    function findFormByUserId(userId){
        return FormModel.find({userId:userId});
    }

    function createForm(form){
        return FormModel.create(form);
    }

    function findAllForms(){
        return mock;
    }

    function findFormById(formId){
        console.log("findFormById",formId);
        for(var i in mock){
            if(mock[i]._id == formId){
                return mock[i];
            }
        }
        return null;
    }

    function updateForm(form,formId){
        var oForm = findFormById(formId);
        console.log("updateForm",form);
        if (oForm){
            oForm.title = form.title;
            return oForm;
        }
        return null;
    }

    function deleteForm(formId){
        var form = findFormById(formId);
        console.log("deleteform \n",form);
        if(!form){return null;}
        console.log("deleteform",form);
        var index = mock.indexOf(form);
        mock.splice(index, 1);
    }
}