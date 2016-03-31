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
        console.log(userId);
        formModel.findFormByUserId(userId)
            .then(function(err){
                res.status(400).send(err);
            },function(doc){
               res.send(doc);
            });
    }

    function findFormById(req,res){
        var id = req.params.formId;
        res.json(formModel.findFormById(id));
    }

    function removeForm(req,res) {

        var id = req.params.formId;
        console.log("server form remover",id);
        formModel.deleteForm(id);
        res.send(200);
    }

    function createForm(req,res) {
        var id = req.params.userId;
        var form = req.body;
        form.userId = id;
        formModel.createForm(form);
        console.log("server",form);
        res.json(form);
    }

    function updateForm(req,res){
        var id = req.params.formId;
        var form = req.body;
        var newform = formModel.updateForm(form,id);
        console.log("server\n",id,form);
        res.send(newform);
    }

}