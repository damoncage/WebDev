/**
 * Created by cage on 3/17/16.
 */
//var uuid = require("node-uuid");
module.exports = function(app,formModel,fieldModel){
    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFormFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.put("/api/assignment/form/:formId/sort",sortFormFields);

    function findFormFields(req,res){
        var formId = req.params.formId;
        var form = null;
        formModel.findFormById(formId)
            .then(function(doc){
                res.json(doc.fields);
            },function(err){
                res.status(400).send(err);
            });

    }

    function findOneFormFields(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormById(formId)
            .then(function(doc){
                for(var i in form.fields) {
                    if (form.fields[i]._id == fieldId) {
                        res.json(form.fields[i]);
                    }
                }
            },function(err){
                res.status(400).send(err);
            });
    }

    function deleteFormFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId,fieldId)
            .then(function(doc,err){
                if(doc)
                res.json(doc);
                else
                    res.status(400).send(err);
            });
    }

    function createField(req,res){
        var formId = req.params.formId;
        var field = req.body;
//        console.log("create Field",formId,field);
        fieldModel.createField(formId,field)
            .then(function(doc,err){
               if(doc){
                   res.json(doc);
               }else{
                   res.status(400).send(err);
               }
            });
    }

    function updateFormFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var field = req.body;
            if(form.fields[i]._id == fieldId){
                form.field[i] = field;
            }
        res.json(form);
    }

 /*   function sortFormFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            fieldModel.sortFormFields(formId, startIndex, endIndex)
                .then(
                    function(doc) {
                        res.json(doc.fields);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
        }
    }*/
    function sortFormFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.sortFormFields(formId, fields)
            .then(
                function(doc) {
                    res.json(doc.fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
}