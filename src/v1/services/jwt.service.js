const jwt = require("jsonwebtoken");

module.exports.jwtService = {
  sign: (object, privateKey, options) => {
    return jwt.sign(object, privateKey, { ...(options && options) });
  },

  verify: (token, privateKey) => {
    try {
      const decoded = jwt.verify(token, privateKey);

      return {
        valid: true,
        decoded,
        errors: null,
      };
    } catch (e) {
      // console.log(e);
      return {
        valid: false,
        errors: e,
        decoded: null,
      };
    }
  },
};
