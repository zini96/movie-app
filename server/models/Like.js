const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    movieId: {
      type: String,
    },
  },
  { timestamps: true }
); //만든날짜 저장

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
