/**
 * Created by cage on 3/17/16.
 */
module.exports = function(app,db,mongoose){
    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,userModel,formModel);
  //  var fieldServer = require("./services/field.service.server.js")(app,userModel,formModel);
}