/**
 * Created by cage on 3/17/16.
 */
var uuid = require("node-uuid");
module.exports = function(app,formModel){
    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFormFields);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.put("/api/assignment/form/:formId/sort",sortFormFields);

    function findFormFields(req,res){
        var formId = req.params.formId;
        var form = null;
        form = formModel.findFormById(formId);
        res.json(form.fields);
    }

    function findOneFormFields(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        console.log(form);
        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                res.json(form.fields[i]);
            }
        }
    }

    function deleteFormFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields.splice(i,1);
                res.json(form);
            }
        }
    }

    function createField(req,res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        var field = req.body;
        field._id = uuid.v4();
        form.fields.push(field);
        res.json(form);
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

    function sortFormFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        var form = formModel.findFormById(formId);
        console.log(form);
        if(form)
            form.fields = fields;
        console.log(form.fields);
        res.json(form.fields);
    }
}