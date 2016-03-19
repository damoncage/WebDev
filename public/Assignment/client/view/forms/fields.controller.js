/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController)

    function FieldController(FieldService,$routeParams,ngDialog){
        var FM = this;
        var formId = $routeParams.formId;
        var tempform = [
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]},
            {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]},
            {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]}
        ];
        function init(){
            FM.fields = [];
            FM.field = null;
            FM.message = "Fields";
            FM.removeField = removeField;
            FM.addField = addField;
            FM.modifyField = modifyField;

            /*FM.sortableOptions = {
                handle: '> .myHandle',
                update: function (e, ui) {
                    var logEntry = FM.fields.map(function (i) {
                        return i.value;
                    }).join(', ');
                    $scope.sortingLog.push('Update: ' + logEntry);
                },
                stop: function (e, ui) {
                    // this callback has the changed model
                    var logEntry = FM.fields.map(function (i) {
                        return i.value;
                    }).join(', ');
                }
            };*/

            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    FM.fields = response.data;
                })
        }
        init();

        function removeField(field){
            console.log("remove");
            FieldService
                .deleteFieldFromForm(formId,field._id)
                .then(function(response){
                    return FieldService.getFieldsForForm(formId)
                })
                .then(function(response){
                    console.log(response);
                    FM.fields = response.data;
                });
        }

        function addField(fieldType){
            for(var i in tempform){
                if(tempform[i].type == fieldType){
                    FieldService
                        .createFieldForForm(formId,tempform[i])
                        .then(function(response){
                            return FieldService.getFieldsForForm(formId);
                        })
                        .then(function(response){
                            FM.fields = response.data;
                        });
                }
            }
        }

        function modifyField(field){
            console.log("template");
            ngDialog.open({ template: 'tpl', className: 'ngdialog-theme-default' });
        }
    }

})();
