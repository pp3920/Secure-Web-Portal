const { Schema, model } = require("mongoose");

const bookmarkSchema = new Schema({

  // Owner user id
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  url: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
model("Bookmark", bookmarkSchema);