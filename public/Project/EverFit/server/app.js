/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app){
    var userModel = require("./models/user.model.server.js")();
    var planModel = require("./models/fitplan.model.server.js")();

    var userService = require("./services/Plan.Service.server.js")(app, planModel, userModel);
    var planService = require("./services/User.Service.server.js")(app, planModel, userModel);
}