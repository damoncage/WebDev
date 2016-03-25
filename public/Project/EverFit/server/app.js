/**
 * Created by cage on 3/8/16.
 */
module.exports = function(app,db,mongoose){
    var userModel = require("./models/user.model.server.js")(app);
    var planModel = require("./models/fitplan.model.server.js")(app);

    var userService = require("./services/Plan.Service.server.js")(app, planModel, userModel);
    var planService = require("./services/User.Service.server.js")(app, planModel, userModel);
}