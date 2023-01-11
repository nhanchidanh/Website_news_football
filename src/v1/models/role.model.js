const {Schema, model} = require("mongoose")

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  key: {
    type: String,
    required: true,
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
}, {
  collection: "roles",
  timestamps: true,
});

module.exports._Role = model("roles", RoleSchema);