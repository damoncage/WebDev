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
        console.log("findByUserId",userId);
        return FormModel.find({userId:userId});
    }

    function createForm(form){
        console.log("createform",form);
        return FormModel.create(form);
    }

    function findAllForms(){
        return FormModel.find();
    }

    function findFormById(formId){
       return FormModel.findById(formId);
    }

    function updateForm(form,formId){
        return FormModel.update({_id:formId},{$set:form});
    }

    function deleteForm(formId){
        return FormModel.remove({_id:formId});
    }
}