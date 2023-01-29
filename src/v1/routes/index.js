const { authRoute } = require("./auth.route");
const { categoryRoute } = require("./category.route");
const { postRoute } = require("./post.route");
const { roleRoute } = require("./role.route");
const { userRoute } = require("./user.route");

function initialRouter(app) {
  app.use("/api/v1/role", roleRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/category", categoryRoute);
  app.use("/api/v1/post", postRoute);
}

module.exports = initialRouter;
