const ParentService = require("./parent.service");

class RoleService extends ParentService {
  superCreate = this.create;
  superUpdate = this.update;
  getRoleIdGTE5 = async () => {
    return {
      status: 200,
      message: "getRoleIdGTE5",
    };
  };

  //@override
  create = async ({ key, name }) => {
    const findKey = await this.model.findOne({
      key: key,
    });

    if (findKey) {
      return {
        status: 400,
        errors: {
          message: "Key đã tồn tại",
        },
      };
    }

    const findName = await this.model.findOne({
      name: name,
    });

    if (findName) {
      return {
        status: 400,
        errors: {
          message: "Name đã tồn tại",
        },
      };
    }

    const response = await this.superCreate({ key: key, name: name });

    return response;
  };

  update = async ({ id, data }) => {
    const findName = await this.model.findOne({
      name: data.name,
    }).exec();

    console.log(findName);


    if (findName && findName._id.toString() !== id) {
      return {
        errors: {
          message: "Tên này đã tồn tại",
        },
        status: 200,
        elements: null,
      };
    }


    const findKey = await this.model.findOne({
      key: data.key,
    }).exec();


    if (findKey && findKey._id.toString() !== id) {
      return {
        errors: {
          message: "key này đã tồn tại",
        },
        status: 200,
        elements: null,
      };
    }

    const response = await this.superUpdate({id: id, data: data});
    return response;
  };
}

module.exports = RoleService;
