const ParentController = require("./parent.controller");

class CategoryController extends ParentController {
  constructor() {
    const _service = new CategoryService(_Category);
    super(_service);
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;

      if (!data.name || !data.slug || !data.level || !data.parentId) {
        return next({
          message:
            "Tên danh mục hoặc slug hoặc level hoặc parentId là những trường bắt buộc!",
          status: 400,
        });
      }

      const response = await this.service.create(data);
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CategoryController();
