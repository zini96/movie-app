import React, { useEffect, useState } from "react";
import Axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.original_title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, SetFavoriteNumber] = useState(0);
  const [Favorited, SetFavorited] = useState(false);

  let variables = {
    userFrom, //userFrom:userFrom
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  console.log(props.movieInfo);

  useEffect(() => {
    //favNum 구하기
    Axios.post("/api/favorite/favoriteNumber", variables) //variable=내가 받고싶은 정보
      .then((response) => {
        // console.log(response.data.favoriteNumber);

        if (response.data.success) {
          SetFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("데이터를 올바르게 받아오지 못했습니다.");
        }
      });

    //내가 favorite을 눌렀는지 정보 받아오기
    Axios.post("/api/favorite/favorited", variables) //variable=내가 받고싶은 정보
      .then((response) => {
        // console.log("favorited", response.data.favorited);
        if (response.data.success) {
          SetFavorited(response.data.favorited);
        } else {
          alert("데이터를 올바르게 받아오지 못했습니다.");
        }
      });
  }, []);

  const onToggle = () => {
    if (Favorited) {
      //이미 추가되어 있다면 리스트에서 빼기
      Axios.post("/api/favorite/removeFromList", variables).then((response) => {
        if (response.data.success) {
          SetFavoriteNumber(FavoriteNumber - 1);
          SetFavorited(!Favorited);
        } else {
          alert("영화를 Favorite 리스트에서 삭제하지 못했습니다.");
        }
      });
    } else {
      //favorite 리스트에 추가
      Axios.post("/api/favorite/addFromList", variables).then((response) => {
        if (response.data.success) {
          SetFavoriteNumber(FavoriteNumber + 1);
          SetFavorited(!Favorited);
        } else {
          alert("영화를 Favorite 리스트에 추가하지 못했습니다.");
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button className="favBtn" onClick={onToggle}>
        {Favorited ? "Delete to Favorite" : "Add to Favorite"} &nbsp;
        {Favorited ? (
          <FaHeart
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#8199f8",
            }}
          />
        ) : (
          <FaRegHeart
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </button>
    </div>
  );
}

export default Favorite;
