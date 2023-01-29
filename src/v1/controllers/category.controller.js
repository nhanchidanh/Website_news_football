const ParentController = require("./parent.controller");
const { _Category } = require("../models/catagory.model");
const CategoryService = require("../services/category.service");

class CategoryController extends ParentController {
  constructor() {
    const _service = new CategoryService(_Category);
    super(_service);
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.name || !data.slug) {
        return next({
          message: "Tên danh mục hoặc slug là những trường bắt buộc!",
          status: 400,
        });
      }

      const response = await this.service.create(data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };

  getByParentId = async (req, res, next) => {
    try {
      console.log(req.params.id);
      const response = await this.service.getByParentId(req.params.id);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CategoryController();
