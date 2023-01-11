const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      default: "",
    },
    detail_text: {
      type: String,
      required: true,
    },
    detail_html: {
      type: String,
      required: true,
    },
    image_title: {
      type: String,
      default: "",
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    images: {
      type: [{ src: String }],
      default: [],
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "post",
    timestamps: true,
  }
);

module.exports._Post = model("post", PostSchema);
