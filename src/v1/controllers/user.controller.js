const userService = require("../services/user.service");
const { _User } = require("../models/user.model");
const ParentController = require("./parent.controller");
const { typeOfObjectId } = require("../utils/functions");
class UserController extends ParentController {
  constructor() {
    const service = new userService(_User);
    super(service);
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.email || !data.password || !data.roleId) {
        return next({
          status: 400,
          message: "Thiếu trường email , password hoặc roleId",
        });
      }

      const response = await this.service.create({
        email: data.email,
        password: data.password,
        roleId: data.roleId,
      });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      let { limit, page } = req.query;
      let response;
      if (!limit && !page) {
        response = await this.service.getAll({ limit: 0, page: 0 });
      } else {
        response = await this.service.getAll({
          limit: +limit,
          page: +page,
          populate: {path: "roleId", select: "key name"},
        });
      }

      res.status(response.status).json(response);
    } catch (error) {
      console.log(error);
    }
  };

  changePassword = async (req, res, next) =>{
    try {
      const id = req.params.id;
      const password = req.body.password;
      console.log(password);
      if(!typeOfObjectId(id + "")){
        return next({
          status: 400,
          message: "Id không hợp lệ!",
        });
      }

      if(!password){
        return next({
          status: 400,
          message: "Thiếu trường mật khẩu!",
        })
      }

      const response = await this.service.changePassword({id, password});
      res.status(response.status).json(response);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController();
