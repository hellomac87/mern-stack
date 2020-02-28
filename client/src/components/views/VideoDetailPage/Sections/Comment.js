import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

const Comment = ({ postId }) => {
  const [commentValue, setCommentValue] = useState("");
  const user = useSelector(state => state.user);

  const handleChange = e => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      write: user.userData._id,
      postId: postId
    };
    Axios.post(`/api/comment/saveComment`, variables).then(res => {
      if (res.data.success) {
        console.log(res.data);
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

      {/* root comment form  */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
