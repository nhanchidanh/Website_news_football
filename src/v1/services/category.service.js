const ParentService = require("./parent.service");

class CategoryService extends ParentService {
  superCreate = this.create;

  create = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name } = data;
        const findName = await this.model.findOne({ name }).exec();

        if (findName) {
          return resolve({
            errors: {
              message: "Tên danh mục đã tồn tại!",
            },
            status: 400,
          });
        }

        const response = await this.superCreate({
          parent_id: data.parentId,
          ...data,
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
}
