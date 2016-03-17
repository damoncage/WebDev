/**
 * Created by cage on 2/29/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function  FormService(){
        var api = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ],

            //declare all functions

            createFormForUser: createFormForUser,
            findAllFormsForUser: finAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            };
        return api;

        //function implementations

        function createFormForUser(userId,form){
            form._id = (new Date).getTime();
            form.userId = userId;
            api.forms.push(form);
            var index = api.forms.indexOf(form);
            return api.forms[index];
        }

        function finAllFormsForUser(userId){
            var tempform = [];
            for(var i in api.forms)
            {
                if(userId == api.forms[i].userId)
                tempform.push(api.forms[i]);
            }
            return tempform;
        }

        function deleteFormById(formId){
            for(var i in api.forms)
            {
                if(formId == api.forms[i]._id)
                api.forms.splice(i,1);
            }
            return api.forms;
        }

        function updateFormById(formId,newForm){
            for(var i in api.forms)
            {
                if(formId == api.forms[i]._id) {
                    console.log("api \n", i, api.forms[i], newForm);
                    api.forms[i] = newForm;
                    return api.forms[i];
                }
            }
            return null;
        }
    }
})();