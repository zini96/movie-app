const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

//mongoDB에서 favorite 숫자 가져오기
//favoriteNumber
router.post("/favoriteNumber", (req, res) => {
  //   req.body.movieId;

  Favorite.find({ movieId: req.body.movieId }) //(req.body로 프론트에서 받은 movieId와 동일한 movieId를 가진 정보 찾기)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      //그 다음 프론트에 다시 숫자 정보 보내주기
      res.status(200).json({ success: true, favoriteNumber: doc.length });
    });
});

//내가 favorite 버튼을 눌렀는지에 대한 정보 가져오기
//favorited
router.post("/favorited", (req, res) => {
  Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    //(req.body로 프론트에서 받은 movieId와 동일한 movieId를 가진 정보 찾기)
    //내가 리스트에 넣었는지 알아야 하기 때문에 userFrom도 필요함
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      //doc가 0이면 favorite list에 넣지 않은것을 이용

      let result = false;
      if (doc.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, favorited: result });
    });
});

//이미 추가되어 있다면 리스트에서 빼기
//removeFromList
router.post("/removeFromList", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

//favorite 리스트에 추가
//addFromList
router.post("/addFromList", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

//좋아하는 영화 리스트 정보 가져오기
//getFavoriteMovie
router.post("/getFavoriteMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

//removeFromFavorite
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
