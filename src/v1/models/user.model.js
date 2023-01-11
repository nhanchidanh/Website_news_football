const {Schema, model} = require("mongoose")

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
    required: true,
    index: true
  },
  key_change_password: {
    type: String,
    default: "",
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Roles",
    required: true
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
}, {
  collection: "users",
  timestamps: true,
});

module.exports._User = model("users", UserSchema);