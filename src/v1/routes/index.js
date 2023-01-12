const { roleRoute } = require("./role.route");
const { userRoute } = require("./user.route");

function initialRouter(app) {
  app.use("/api/v1/role", roleRoute)
  app.use("/api/v1/user", userRoute)
  return app;
}

module.exports = initialRouter;
