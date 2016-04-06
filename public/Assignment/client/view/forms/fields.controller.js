/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController)

    function FieldController(FieldService,$routeParams,ngDialog,$scope,$location){
        var FM = this;
        var formId = $routeParams.formId;
        var tempform = [
            {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            {"_id": null, "label": "New Email Field","type": "EMAIL", "placeholder":"emails"},
            {"_id": null, "label": "New Password Field","type": "PASSWORD", "placeholder":"password"},
            {"_id": null, "label": "New Date Field", "type": "DATE"},
            {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [{"label":"option1","value":"option1"}]},
            {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": []},
            {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": []
            }
        ];
        function init(){
            FM.fields = [];
            FM.field = null;
            FM.message = "Fields";
            FM.removeField = removeField;
            FM.addField = addField;
            FM.modifyField = modifyField;
            FM.sortupdate = sortupdate;

            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    FM.fields = response.data;
                })
        }
        init();

        FM.sortableOptions = {
//                handle: '> .myHandle',
            update: function (e, ui) {
                var logEntry = FM.fields.map(function (i) {
                    return i.value;
                }).join(', ');
            },
            axis:'y',
            stop: function (e, ui) {
                // this callback has the changed model
                var logEntry = FM.fields.map(function (i) {
                    return i.value;
                }).join(', ');
                FM.sortupdate(FM.fields);
            }
        };

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
            console.log("template",field.options);
            //field.options = null;
            ngDialog.open({
                template: field.type,
                controller: ['$scope','FieldService',function($scope,FieldService){
                    $scope.area = {
                        _id : $scope.ngDialogData.target.id,
                        label:$scope.ngDialogData.target.label,
                        placeholder:$scope.ngDialogData.target.placeholder,
                        options:$scope.ngDialogData.target.options,
                        type:$scope.ngDialogData.target.type
                    };
                    console.log($scope.area);
                    $scope.updateField = function(field,id){
                        if(!field){
                            console("return");
                            return -1;
                        }else{ field.options = '{ "options" : ' + field.options + '}';
                            console.log(field.options);
                            var options = JSON.parse(field.options);
                            field.options = options.options;
                            FieldService.updateField($scope.ngDialogData.formId,field,id)
                                .then(function(response){
                                    $scope.closeThisDialog(1);
                                });
                        }
                        };
                }],
                data:{target:field,
                    formId:formId},
                scope:$scope,
                className: 'ngdialog-theme-default'})
                .closePromise.then(function(data){
                if(data){
                    init();
                }
            });
        }


        function sortupdate(field){
            console.log(FM.fields,"\n now",field);
            FieldService
                .sortField(formId,field)
                .then(function(response){
                    console.log(response.data);
                    FM.fields = response.data;
                })
        }
    }

})();
