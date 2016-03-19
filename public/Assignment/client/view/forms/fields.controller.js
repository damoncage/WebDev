/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService){
        var FM = this;
        function init(){
            FM.fields = [];
            FM.field = null;
            FM.message = "Fields";
            FM.removeField = removeField;
            FieldService
                .getFieldsForForm("000")
                .then(function(response){
                    FM.fields = response.data;
                })
        }
        init();

        function removeField(field){
            FieldService
                .deleteFieldFromForm("000",field._id)
                .then(function(response){
                    return FieldService.getFieldsForForm("000")
                })
                .then(function(response){
                    console.log(response);
                    FM.fields = response.data;
                });
        }
    }
})();