/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app,formModel){
    app.get("/api/assignment/form/:formId/field", findFormFields),
    app.get("/api/assignment/form/:formId/field/:fieldId", findOneFormFields),
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById),
    app.post("/api/assignment/form/:formId/field", createField),
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById)

    function findFormFields(req,res){
        formModel
    }

    function findOneFormFields(req,res){

    }
}