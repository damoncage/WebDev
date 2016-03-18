/**
 * Created by cage on 3/17/16.
 */
var mock = require("./form.mock.json");
module.exports = function(app){
    api = {
        findFormByTitle: findFormByTitle,
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

    function createForm(form){
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function findAllForms(){
        return mock;
    }

    function findFormById(formId){
        for(var i in mock){
            if(mock[i]._id == formId){
                return mock[i];
            }
        }
        return null;
    }

    function updateForm(form,formId){
        var oForm = findFormById(formId);
        if (oForm){
            oForm = form;
            return form;
        }
        return null;
    }

    function deleteForm(formId){
        var form = findFormById(formId);
        if(!form)
        return null;
        var index = mock.indexOf(form);
        mock.splice(index, 1);
    }
}