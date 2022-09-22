import Axios from "axios";
import React, { useEffect, useState } from "react";
import Favorite from "../MovieDetail/Sections/Favorite";
import "./favoritepage.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";
import FollowingPage from "../commons/FollowingPage";

function FavoritePage(props) {
  const [FavoriteLists, SetFavoriteLists] = useState([]);

  useEffect(() => {
    fetchData();
  }, [FavoriteLists.length]);

  const fetchData = () => {
    let variables = {
      userFrom: localStorage.getItem("userId"),
    };

    Axios.post("/api/favorite/getFavoriteMovie", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.doc);
        SetFavoriteLists(response.data.doc);
      } else {
        alert("영화 정보를 가져오지 못했습니다.");
      }
    });
  };

  //   console.log(FavoriteLists.movieTitle);

  const renderCards = FavoriteLists.map((list, index) => {
    const content = (
      <div>
        {list.moviePost ? (
          <a
            href={`/movie/${list.movieId}`}
            style={{ color: "inherit", border: "none" }}
          >
            <img src={`${IMAGE_BASE_URL}w300${list.moviePost}`} />
          </a>
        ) : (
          "no image"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${list.movieTitle}`}>
          <td>{list.movieTitle}</td>
        </Popover>

        <td>{list.movieRunTime} minutes</td>
        <td>
          <button
            className="removeBtn"
            onClick={() => {
              onClickDelete(list.movieId, list.userFrom);
            }}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  const onClickDelete = (movieId, userFrom) => {
    let variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchData();
        } else {
          alert("리스트에서 제거하지 못했습니다.");
        }
      }
    );
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorite</th>
          </tr>
        </thead>

        <tbody>{renderCards}</tbody>
      </table>
      <FollowingPage />
    </div>
  );
}

export default FavoritePage;
