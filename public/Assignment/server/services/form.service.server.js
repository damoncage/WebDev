/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form",findFormByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", removeForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormByUserId(req,res){
        var userId = req.params.userId;
        res.json(userModel.findFormByUserId(userId));
    }

    function findFormById(req,res){
        var id = req.params.formId;
        res.json(userModel.findFormById(id));
    }

    function removeForm(req,res) {
        var id = req.params.formId;
        userModel.deleteForm(id);
        res.send(200);
    }

    function createForm(req,res) {
        var id = req.params.userId;
        var form = req.body;
        form.userId = id;
        console.log("server",form);
        userModel.createForm(form);
        res.send(form);
    }

    function updateForm(req,res){
        var id = req.params.formId;
        var form = req.body;
        var newform = userModel.updateForm(form,id);
        res.send(newform);
    }

}