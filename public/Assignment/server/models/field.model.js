/**
 * Created by cage on 3/31/16.
 */
var q = require('q');
module.exports = function(db,mongoose){
    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('field',fieldSchema);
    var FormModel = mongoose.model('Form');
    var api = {
        deleteField:deleteField,
        createField:createField,
        updateFormFieldById:updateFormFieldById,
        sortFormFields:sortFormFields
    }
    return api;

    function deleteField(formId,fieldId){
        var deferred = q.defer();
        FormModel.findById(formId,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                console.log("delete",formId,fieldId);
                doc.fields.id(fieldId).remove();
                doc.save(function(err,save){
                    if(save)
                        deferred.resolve(doc);
                    else
                    deferred.reject(err);
                });

            }
        });
        return deferred.promise;
    }

    function createField(formId,field){
        var deferred = q.defer();
        delete field._id;
        FormModel.findById(formId,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                console.log("model",doc.title,field);
                doc.fields.push(field);
                doc.save();
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

   function updateFormFieldById(formId,field,fieldId){
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        /*FormModel.findOneAndUpdate(
            {_id: formId, 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.options': field.options,
                    'fields.label':field.label,
                    'fields.placeholder':field.placeholder},
                    'fields.type':field.type},
            function(err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                    console.log(doc);
                }
                else {
                    deferred.reject(err);
                    console.log("err",err);
                }
            }
        );*/
        return deferred.promise;
    }

   /* function updateFormFieldById(formId,field,fieldId){
        delete field._id;
        return FormModel.findById(formId)
            .then(function(doc,err){
            if(doc){
                var tmp = doc.fields.id(fieldId);
                tmp.label = field.label;
                tmp.placeholder = field.placeholder;
                for(var i in field.options){
                    tmp.options[i] = field.options[i];
                }
                tmp._id = fieldId;
                console.log(tmp.options,field.options);
                doc.save();
                console.log("final---------------",doc.fields);
            }else{
                return err;
            }
        });
    }*/

/*    function sortFormFields(formId,startIndex,endIndex){
        return FormModel
        .findById(formId)
            .then(function(doc){
                doc.fields.splice(endIndex, 0, doc.fields.splice(startIndex,1)[0]);
                doc.markModified("fields")
                console.log(doc.fields);
                doc.save();
                });
            }*/

    function sortFormFields(formId,fields){
        return FormModel.findById(formId)
            .then(function(doc){
                doc.fields = fields;
                doc.markModified("fields");
                doc.save();
            });
    }
};
