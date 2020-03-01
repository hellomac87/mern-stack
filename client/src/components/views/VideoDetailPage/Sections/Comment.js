import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const Comment = ({ postId, commentList, refreshFunc }) => {
  const [commentValue, setCommentValue] = useState("");
  const user = useSelector(state => state.user);

  const handleChange = e => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: postId
    };
    Axios.post(`/api/comment/saveComment`, variables).then(res => {
      if (res.data.success) {
        console.log(res.data.result);
        setCommentValue("");
        refreshFunc(res.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      <br />
      <p>replies</p>
      <hr />

      {/* comment list */}
      {commentList &&
        commentList.map((comment, idx) => {
          console.log(commentList, comment);
          return (
            !comment.responseTo && (
              <div key={comment._id}>
                <SingleComment
                  postId={postId}
                  comment={comment}
                  refreshFunc={refreshFunc}
                />

                <ReplyComment
                  commentList={commentList}
                  refreshFunc={refreshFunc}
                  postId={postId}
                  parentCommentId={comment._id}
                />
              </div>
            )
          );
        })}

      {/* root comment form  */}
      <form style={{ display: "flex" }} onSubmit={e => onSubmit(e)}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button
          style={{ width: "20%", height: "52px" }}
          onClick={e => onSubmit(e)}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
