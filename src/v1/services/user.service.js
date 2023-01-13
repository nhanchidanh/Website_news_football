const { typeOfObjectId } = require("../utils/functions");
const ParentService = require("./parent.service");

class UserService extends ParentService {
  superCreate = this.create;
  superUpdate = this.update;
  // superGetAll = this.getAll;
  create = ({ email, roleId, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const findEmail = await this.model.findOne({ email }).exec();

        if (findEmail) {
          return resolve({
            errors: {
              message: "Email đã tồn tại!",
            },
            status: 400,
          });
        }

        if (!typeOfObjectId(roleId + "")) {
          return resolve({
            errors: {
              message: "RoleId không hợp lệ",
            },
            status: 400,
          });
        }

        const hashPassword = await this.model.hashPassword(password);

        const response = await this.superCreate({
          email,
          roleId,
          password: hashPassword,
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
        const findEmail = await this.model
          .findOne({
            email: data.email,
          })
          .exec();

        if (!typeOfObjectId(id + "")) {
          return resolve({
            errors: {
              message: "Id không hợp lệ!",
            },
            status: 400,
          });
        }

        if (data.email) {
          const findEmail = await this.model
            .findOne({
              email: data.email,
            })
            .exec();

          if (findEmail && id !== findEmail._id.toString()) {
            return resolve({
              errors: {
                message: "Email đã tồn tại!",
              },
              status: 400,
            });
          }
        }

        const response = await this.superUpdate({ id, data });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  changePassword = ({ id, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const hashPassword = await this.model.hashPassword(password);
        resolve(await this.update({ id, data: { password: hashPassword } }));
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = UserService;
