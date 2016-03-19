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
            FM.message = "Fields"
            FieldService
                .getFieldsForForm("000")
                .then(function(response){
                    FM.fields = response.data;
                    console.log(FM.fields[3].options);
                })
        }
        init();
    }
})();