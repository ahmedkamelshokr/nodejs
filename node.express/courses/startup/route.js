const courses = require('../routes/courses');
const users = require("../routes/user");
const auth = require("../routes/auth");

//this error middleware handles only error happens durin a request
//other errors are not handled here
const error = require("../middleware/error");

module.exports = function (app) {
 
  app.use("/api/courses", courses);
  app.use("/api/users", users);
  app.use("/api/auth", auth);

  app.use(error);


};
