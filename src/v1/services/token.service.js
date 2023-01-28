const { _Token } = require("../models/token.model");
const { createOTP } = require("../utils/functions");

class TokenService {
  static create = ({ user_id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const OTP = createOTP();

        const hashOTP = await _Token.hashToken(OTP);

        const _token = new _Token({
          user_id,
          token: hashOTP,
        });

        await _token.save();

        resolve({
          token: hashOTP,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = TokenService;
