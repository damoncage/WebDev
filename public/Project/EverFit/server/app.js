/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app,db,mongoose){
    var userModel = require("./models/user.model.server.js")(app,db,mongoose);
    var planModel = require("./models/fitplan.model.server.js")(app,db,mongoose);

    var planService = require("./services/Plan.Service.server.js")(app, planModel, userModel);
    var userService = require("./services/User.Service.server.js")(app, planModel, userModel);
}