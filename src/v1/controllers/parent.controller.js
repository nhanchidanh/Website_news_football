const roleService = require("../services/role.service");
const { _Role } = require("../models/role.model");
class ParentController {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      let { limit, page } = req.query;
      let response;
      if (!limit && !page) {
        response = await this.service.getAll({ limit: 0, page: 0 });
      } else {
        response = await this.service.getAll({ limit: +limit, page: +page });
      }

      res.status(response.status).json(response);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  update = async (req, res, next) => {
    try {
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
