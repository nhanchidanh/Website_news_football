const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    default: "",
    index: true
  },
  key_change_password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum:["ADMIN", "USER"],
    default: "USER"
  },
  image: {
    type: String,
    default: "",
  },
  access_token: {
    type: String,
    default: "",
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  }
}, {
  collection: "users",
  timestamps: true,
});


UserSchema.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (passwordInput, hashPassword) =>{
  return await bcrypt.compare(passwordInput, hashPassword);
}

module.exports._User = model("users", UserSchema);