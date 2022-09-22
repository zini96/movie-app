import React from "react";
import { Col } from "antd";

function GridCard(props) {
  if (props.landingpage) {
    return (
      <>
        {props.image ? (
          <Col lg={6} md={8} xs={24}>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <a href={`/movie/${props.movieId}`}>
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={props.image}
                  alt={props.movieName}
                />
              </a>
            </div>
          </Col>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {props.image ? (
          <Col lg={6} md={8} xs={24}>
            <div style={{ position: "relative", width: "100%" }}>
              <img
                className="imgHover"
                style={{ width: "100%", height: "auto" }}
                src={props.image}
                alt={props.castName}
              />
              <div className="hoverBox">
                <p>{props.castName}</p>
                <span>{props.character}</span>
              </div>
            </div>
          </Col>
        ) : null}
      </>
    );
  }
}

export default GridCard;
