const ParentService = require("./parent.service");

class PostService extends ParentService {
  superCreate = this.create;
  superUpdate = this.update;

  create = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findTitle = await this.model
          .findOne({ title: data.title })
          .exec();

        if (findTitle) {
          return resolve({
            errors: {
              message: `Tiêu đề ${data.title} đã tồn tại`,
            },
            status: 400,
          });
        }

        const response = await this.superCreate({
          ...data,
          category_id: data.categoryId,
          user_id: data.userId,
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  update = ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findTitle = await this.model
          .findOne({ title: data.title })
          .select("_id")
          .exec();

        if (findTitle && findTitle._id.toString() !== id) {
          return resolve({
            errors: {
              message: `Tiêu đề ${data.title} đã tồn tại`,
            },
            status: 400,
          });
        }

        const response = await this.superUpdate({ id, data });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = PostService;
