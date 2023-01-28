const { typeOfObjectId } = require("../utils/functions");

class ParentService {
  constructor(model) {
    this.model = model;
  }

  getAll = (filters = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const page = parseInt(filters.page) || 1;
        const limit = parseInt(filters.limit) || 5;
        const skip = (page - 1) * limit;
        let options = { is_delete: false };
        let sort = filters.sort || "_id";
        let sortBy = {};

        filters.sort ? (sort = filters.sort.split(",")) : (sort = [sort]);

        sort[1] ? (sortBy[sort[0]] = sort[1]) : (sortBy[sort[0]] = "asc");

        if (filters.search && filters.field) {
          options = {
            is_delete: false,
            [filters.field]: { $regex: filters.search, $options: "i" },
          };
        }

        const data = await this.model
          .find(options)
          .select(filters.selectField)
          .limit(limit)
          .skip(skip)
          .sort(sortBy);

        const total = await this.model.countDocuments(options);

        resolve({
          elements: data,
          errors: null,
          status: 200,
          meta: {
            paginations: {
              page,
              limit,
              totalRows: Math.ceil(total / limit),
            },
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  create = async (data) => {
    const response = await this.model.create(data);

    return {
      elements: response,
      status: 201,
      errors: null,
    };
  };

  update = async ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.model.findOneAndUpdate({ _id: id }, data, {
          upsert: false,
          new: true,
        });

        if (!response) {
          return resolve({
            errors: {
              message: "Id không tồn tại",
            },
            status: 400,
          });
        }

        resolve({
          elements: response,
          status: 201,
          errors: null,
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  delete = ({ id, isDelete = false }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (isDelete) {
          //xoa vinh vien
          const response = await this.model.findOneAndDelete(
            { _id: id },
            { rawResult: true }
          );
          return resolve({
            errors: null,
            status: 200,
            elements: response,
          });
        }

        const response = await this.update({ id, data: { is_delete: true } });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteForce = async (id) => {
    return await this.delete({ id, isDelete: true });
  };

  getById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!typeOfObjectId(id + "")) {
          return resolve({
            errors: {
              message: "Id Không đúng giá trị",
            },
            elements: null,
            status: 400,
          });
        }
        const response = await this.model.findById(id);

        if (!response) {
          return resolve({
            errors: {
              message: "Id Không tồn tại",
            },
            elements: {},
            status: 200,
          });
        }

        resolve({
          elements: response,
          errors: null,
          status: 200,
        });
      } catch (error) {
        next(error);
      }
    });
  };
}

module.exports = ParentService;
