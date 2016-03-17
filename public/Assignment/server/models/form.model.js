/**
 * Created by cage on 3/17/16.
 */
var mock = require("./form.mock.json");
module.exports = function(app){
    api = {
        findFormByTitle: findFormByTitle,
        createForm: createForm,
        findallForm: findallForm,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm
    }
    return api;

}