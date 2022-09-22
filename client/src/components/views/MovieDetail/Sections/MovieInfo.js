import React from "react";
import { Descriptions, Badge } from "antd";

function MovieInfo(props) {
  let { movie } = props;

  return (
    <Descriptions title="Movie Info" bordered>
      <Descriptions.Item label="Title">
        {movie.original_title}
      </Descriptions.Item>
      <Descriptions.Item label="release_date">
        {movie.release_date}
      </Descriptions.Item>
      <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="vote_average" span={2}>
        {/* antd Description에서 span은 가로 셀 병합 */}
        {movie.vote_average}
      </Descriptions.Item>
      <Descriptions.Item label="vote_count">
        {movie.vote_count}
      </Descriptions.Item>
      <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="popularity">
        {movie.popularity}
      </Descriptions.Item>
      <Descriptions.Item label="genre">
        <div style={{ display: "flex" }}>
          {movie !== undefined
            ? movie.genres.map((genre, index) => (
                <React.Fragment key={index}>
                  {genre.name}, &nbsp;
                </React.Fragment>
              ))
            : null}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="production">
        <div style={{ display: "flex" }}>
          {movie !== undefined
            ? movie.production_companies.map((company, index) => (
                <React.Fragment key={index}>
                  {company.name}, &nbsp;
                </React.Fragment>
              ))
            : null}
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;
