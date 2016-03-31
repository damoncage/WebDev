/**
 * Created by cage on 3/17/16.
 */
var mock = require("./form.mock.json");
var uuid = require("node-uuid");
module.exports = function(db,mongoose){
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
        for(var i in mock){
            if(mock[i].title == title){
                return mock[i];
            }
        }
        return null;
    }

    function findFormByUserId(userId){
        var form = [];
        for(var i in mock){
            if(mock[i].userId == userId){
                form.push(mock[i]);
            }
        }
        console.log(form);
        return form;
    }

    function createForm(form){
        form._id = uuid.v4();
        mock.push(form);
        return form;
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