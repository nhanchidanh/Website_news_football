const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const bcrypt = require("bcrypt");

const TokenSchema = new Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
    expire_at: {
      type: Date,
      default: Date.now,
      index: { expires: 180000 },
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

TokenSchema.statics.hashToken = async (token) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(token, salt);
};

TokenSchema.statics.compareToken = async (tokenInput, hashToken) => {
  return await bcrypt.compare(tokenInput, hashToken);
};

module.exports._Token = model("tokens", TokenSchema);
