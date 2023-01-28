const { jwtService } = require("../services/jwt.service");

const PRIVATE_KEY_ACCESS_TOKEN = process.env.PRIVATE_KEY_ACCESS_TOKEN;

class AuthMiddleware {
  static authorization = (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return next({
          status: 400,
          message: "Vui lòng đăng nhập.",
        });
      }

      const accessToken = token.split(" ")[1];

      const { valid, decoded, errors } = jwtService.verify(
        accessToken,
        PRIVATE_KEY_ACCESS_TOKEN
      );

      if (!valid && errors) {
        return next({
          status: 401,
          message: errors.message,
        });
      }

      req.user = decoded.user;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthMiddleware;
