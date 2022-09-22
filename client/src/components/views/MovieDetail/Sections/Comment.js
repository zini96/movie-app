import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Avatar } from "antd";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [Visible, setVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [CommentNumber, setCommentNumber] = useState(0);

  // console.log(user)

  useEffect(() => {
    setCommentNumber(props.commentLists.length);
  }, [props.commentLists]);

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      movieId: props.movieId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue(""); //초기화
        props.refreshFunction(response.data.result); //save한 comment의 정보를 부모 component에서 받을 수 있게!
      } else {
        alert("코멘트 등록에 실패했습니다.");
      }
    });
  };

  const CommentList =
    props.commentLists &&
    props.commentLists.map(
      (comment, index) =>
        !comment.responseTo && (
          <React.Fragment key={comment._id}>
            <SingleComment
              comment={comment}
              movieId={props.movieId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              parentCommentId={comment._id}
              commentLists={props.commentLists}
              movieId={props.movieId}
              refreshFunction={props.refreshFunction}
            />
          </React.Fragment>
        )
    );

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <br />
      <p
        style={{
          fontWeight: "700",
          marginLeft: "0.5rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
        onClick={() => {
          setVisible(!Visible);
        }}
      >
        Share your opinions about{" "}
        <span style={{ color: "black", fontSize: "15px" }}>
          '{props.movieTitle}'
        </span>
        <span
          style={{ color: "#cdcdcd", fontWeight: "500", marginLeft: "5px" }}
        >
          (comment(s)= {CommentNumber})
        </span>
      </p>
      <hr style={{ marginBottom: "1rem" }} />
      {Visible && (
        <div>
          <div style={{ display: "flex", height: "100%" }}>
            <div className="avatarBox">
              <Avatar src={user.userData.image} alt="avatar" />
              <p style={{ marginBottom: "0" }}>{user.userData.name}</p>
            </div>

            {/* Root Comment Form */}
            <form
              className="commentForm rootCommentForm"
              style={{ width: "100%" }}
              onSubmit={onSubmit}
            >
              <textarea
                className="commentInput"
                onChange={handleClick}
                value={commentValue}
                placeholder="코멘트를 작성해 주세요"
              />

              <button className="commentBtn" onClick={onSubmit}>
                Submit
              </button>
            </form>
          </div>

          {/* Comment Lists */}
          <hr style={{ marginTop: "1rem" }} />

          {props.commentLists &&
            props.commentLists.map(
              (comment, index) =>
                !comment.responseTo && (
                  <React.Fragment key={comment._id}>
                    <SingleComment
                      comment={comment}
                      movieId={props.movieId}
                      refreshFunction={props.refreshFunction}
                    />
                    <ReplyComment
                      parentCommentId={comment._id}
                      commentLists={props.commentLists}
                      movieId={props.movieId}
                      refreshFunction={props.refreshFunction}
                    />
                  </React.Fragment>
                )
            )}
        </div>
      )}
    </div>
  );
}

export default Comment;
