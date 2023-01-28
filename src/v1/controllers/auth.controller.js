const AuthService = require("../services/auth.service");
const { _User } = require("../models/user.model");
const ParentController = require("./parent.controller");

const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "production" ? false : true,
  path: "/",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 3.154e10, //1year
};

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

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.email || !data.password) {
        return next({
          status: 400,
          message: "Thiếu email hoặc password",
        });
      }

      const response = await this.service.signIn({
        email: data.email,
        password: data.password,
      });

      if (response.elements && response.elements.refreshToken) {
        res.cookie(
          "refreshToken",
          response.elements.refreshToken,
          refreshTokenCookieOptions
        );
      }

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req, res, next) => {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({
        errors: null,
        elements: null,
        status: 200,
        meta: {
          message: "Đăng xuất thành công",
        },
      });
    } catch (error) {
      next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { email } = req.params;
      const { token } = req.query;

      const response = await this.service.verifyAccount({ email, otp: token });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req, res, next) => {
    try {
      if (!req.body.email) {
        return next({
          status: 400,
          message: "Thiếu trường email",
        });
      }

      const response = await this.service.forgotPassword({
        email: req.body.email,
      });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const token = req.query.token;
      const email = req.params.email;

      const data = req.body;

      if (!token || !data.password) {
        return next({
          message: "Thiếu trường token hoặc password",
          status: 400,
        });
      }

      const response = await this.service.changePassword({
        token,
        email,
        password: data.password,
      });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req, res, next) => {
    try {
      const user = req.user;
      res.status(200).json({
        errors: null,
        elements: user,
        status: 200,
        meta: {
          message: "Lấy thông tin đăng nhập thành công.",
        },
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return next({
          status: 401,
          message: "Vui lòng đăng nhập lại",
        });
      }

      const response = await this.service.refreshToken({
        token: refreshToken,
      });

      if (response.elements && response.elements.refreshToken) {
        res.cookie(
          "refreshToken",
          response.elements.refreshToken,
          refreshTokenCookieOptions
        );
      }

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
