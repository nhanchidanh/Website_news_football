const RoleService = require("../services/role.service");
const { _Role } = require("../models/role.model");
const ParentController = require("./parent.controller");

class RoleController extends ParentController {
  #_service;
  constructor() {
    const _service = new RoleService(_Role);
    super(_service);
    this.#_service = _service;
  }

  getAll = async (req, res, next) => {
    try {
      let { limit, page } = req.query;

      if (!parseInt(limit) || !parseInt(page)) {
        return next({
          status: 400,
          message: "Limit hoặc page không phải là chữ số !",
        });
      }

      let response = await this.service.getAll({
        limit: +limit,
        page: +page,
        selectField: "name key",
      });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  getRoleIdGTE5 = async (req, res, next) => {
    try {
      const response = await this.#_service.getRoleIdGTE5();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  create = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.name || !data.key) {
        return next({
          status: 400,
          message: "Thiếu trường name hoặc key",
        });
      }

      const response = await this.#_service.create({
        key: data.key,
        name: data.name,
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new RoleController();
