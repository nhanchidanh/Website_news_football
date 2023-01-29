const roleService = require("../services/role.service");
const { _Role } = require("../models/role.model");
class ParentController {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      let filters = req.query;

      const response = await this.service.getAll(filters);

      res.status(response.status).json(response);
    } catch (error) {
      // console.log(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const response = await this.service.getById(req.params.id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create();
      res.status(response.status).json(response);
    } catch (error) {
      // console.log(error);
    }
  };

  update = async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return next({
          message: "Thiếu nội dung.",
          status: 400,
        });
      }

      const response = await this.service.update({
        id: req.params.id,
        data: req.body,
      });
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const isDelete = req.query.is_delete;
      const id = req.params.id;
      let response;
      if (isDelete) {
        response = await this.service.delete({ id, isDelete: true });
      } else {
        response = await this.service.delete({ id });
      }
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteForce = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await this.service.deleteForce(id);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ParentController;
