const {Schema, model} = require("mongoose")

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 1,
  },
  parentId: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  is_delete: {
    type: Boolean,
    default: false,
  },
}, {
  collection: "categories",
  timestamps: true,
});

module.exports._Category = model("categories", CategorySchema);