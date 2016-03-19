/**
 * Created by cage on 2/29/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function  FormService($http){
        var api = {
            //declare all functions
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            };
        return api;

        //function implementations

        function createFormForUser(userId,form){
            console.log();
            return $http.post("/api/assignment/user/" + userId + "/form",form);
        }

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId){
            console.log("clientservice");
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId,newForm){
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
    }
})();