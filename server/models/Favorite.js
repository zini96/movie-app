const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User", //ref로 User를 지정해주면 User의 정보를 이용할 수 있음
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
); // timestamps는 생성된 시간을 자동으로 만들어줌

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
