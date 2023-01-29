const PostService = require("../services/post.service");
const ParentController = require("./parent.controller");
const { _Post } = require("../models/post.model");
const { typeOfObjectId } = require("../utils/functions");

class PostController extends ParentController {
  constructor() {
    const _service = new PostService(_Post);
    super(_service);
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;

      if (
        !data.title ||
        !data.detail_text ||
        !data.detail_html ||
        !data.categoryId ||
        !data.userId
      ) {
        return next({
          message:
            "titil, detail_text, datail_html, categoryId, userId là trường bắt buộc!",
          status: 400,
        });
      }

      if (
        !typeOfObjectId(data.categoryId + "") ||
        !typeOfObjectId(data.userId + "")
      ) {
        return next({
          message: "Category id hoặc user id không hợp lệ",
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

module.exports = new PostController();
