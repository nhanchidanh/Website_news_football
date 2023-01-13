const AuthService = require("../services/auth.service");
const { _User } = require("../models/user.model");
const ParentController = require("./parent.controller");

class AuthController extends ParentController {
  #_service;
  constructor() {
    const _service = new AuthService(_User);
    super(_service);
  }

  signUp = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.email || !data.password) {
        return next({
          status: 400,
          message: "Thiếu email hoặc password",
        });
      }
      const response = await this.service.signUp({
        email: data.email,
        password: data.password,
      });

      res.status(response.status).json(response)
    } catch (error) {
      next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const {email} = req.params;
      const {token} = req.query;

      const response = await this.service.verifyAccount({email, otp: token})

      res.status(response.status).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController();
