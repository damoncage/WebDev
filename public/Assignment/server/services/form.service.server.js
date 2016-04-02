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
            .then(function(doc){
               res.send(doc);
            },function(err){
            res.status(400).send(err);
        });
    }

    function findFormById(req,res){
        var id = req.params.formId;
        formModel.findFormById(id)
            .then(function(doc){
                console.log(doc);
                console.log(doc);
                res.send(doc);
            },function(err){
                res.status(400).send(err);
                });
    }

    function removeForm(req,res) {
        var id = req.params.formId;
        console.log("server form remover",id);
        formModel.deleteForm(id)
            .then(function(doc){
                res.send(200);
            },function(err){
                res.status(400).send(err);
            });
    }

    function createForm(req,res) {
        var id = req.params.userId;
        var form = req.body;
        form.userId = id;
        formModel.createForm(form)
            .then(function(doc){
            res.send(doc);
        },function(err){
            res.status(400).send(err);
        });
    }

    function updateForm(req,res){
        var id = req.params.formId;
        var form = req.body;
        formModel.updateForm(form,id)
            .then(function(doc){
                res.send(doc);
            },function(err){
            res.status(400).send(err);
        });
    }

}