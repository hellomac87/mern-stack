import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Comment, Avatar, Button, Input } from "antd";

const { TextArea } = Input;
const SingleComment = ({ postId, comment, refreshFunc }) => {
  const user = useSelector(state => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  const onHandleChange = e => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    // 유저정보, 댓긋내영 request
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: postId,
      responseTo: comment._id
    };
    Axios.post(`/api/comment/saveComment`, variables).then(res => {
      if (res.data.success) {
        setCommentValue("");

        refreshFunc(res.data.result);
        setOpenReply(false);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt />}
        content={<p>{comment.content}</p>}
        refreshFunc={refreshFunc}
      />

      {openReply && (
        <form style={{ display: "flex" }} onSubmit={e => onSubmit(e)}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onHandleChange}
            value={commentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <Button
            style={{ width: "20%", height: "52px" }}
            onClick={e => onSubmit(e)}
          >
            submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
