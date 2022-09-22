import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import GridCard from "../commons/GridCard";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import { useParams } from "react-router-dom";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import Axios from "axios";
import FollowingPage from "../commons/FollowingPage";

function MovieDetail(props) {
  const { movieId } = useParams();

  const [Movie, SetMovie] = useState([]);
  const [Casts, SetCasts] = useState([]);
  const [ActorToggle, SetActorToggle] = useState(false);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    // console.log(movieId);

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        SetMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.cast);
        SetCasts(response.cast);
      });

    Axios.post("/api/comment/getComments", { movieId: movieId }).then(
      (response) => {
        if (response.data.success) {
          setComments(response.data.comments);
        } else {
          alert("코멘트 정보를 가져오지 못했습니다.");
        }
      }
    );
  }, []);

  const onToggle = () => {
    SetActorToggle(!ActorToggle);
  };

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment));
  };

  return (
    <>
      {Movie.backdrop_path && (
        <div>
          {/* Header */}
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            description={Movie.overview}
          />

          {/* Body */}
          <div style={{ width: "85%", margin: "1rem auto" }}>
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userFrom={localStorage.getItem("userId")}
            />
            {/* Movie Info */}
            <MovieInfo movie={Movie} />
            <br />

            {/* Actors Grid */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
              }}
            >
              <button onClick={onToggle} className="ToggleBtn">
                Toggle Actor View
              </button>
            </div>
            {ActorToggle && (
              <div style={{ width: "85%", margin: "1rem auto" }}>
                <h2>Movie Cast</h2>
                <hr />
                {/* movie grid cards */}
                <Row gutter={[16, 16]}>
                  {Casts &&
                    Casts.map((cast, index) => (
                      <React.Fragment key={cast.cast_id}>
                        <GridCard
                          castId={cast.cast_id}
                          castName={cast.name}
                          character={cast.character}
                          image={
                            cast.profile_path
                              ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                              : null
                          }
                        />
                      </React.Fragment>
                    ))}
                </Row>
              </div>
            )}
            {/* comment */}
            <Comment
              refreshFunction={refreshFunction}
              commentLists={Comments}
              movieId={movieId}
              movieTitle={Movie.original_title}
            />
          </div>
          <FollowingPage />
        </div>
      )}
    </>
  );
}

export default MovieDetail;
