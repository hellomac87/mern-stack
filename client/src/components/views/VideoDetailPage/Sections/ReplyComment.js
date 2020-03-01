import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentList,
  refreshFunc,
  postId,
  parentCommentId
}) => {
  const [childCommentNumber, childsetCommentNumber] = useState(0);
  const [onReplyComments, setOnReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;

    commentList.map((comment, idx) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });

    childsetCommentNumber(commentNumber);
  }, [commentList, parentCommentId]);

  const onHandleClick = () => {
    setOnReplyComments(!onReplyComments);
  };
  const renderReplyComment = pId => {
    return commentList.map((comment, idx) => {
      return (
        <>
          {comment.responseTo === pId && (
            <div key={comment._id} style={{ width: "80%", marginLeft: "40px" }}>
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
          )}
        </>
      );
    });
  };
  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleClick}
        >
          {" "}
          View {childCommentNumber} more comment(s)
        </p>
      )}

      {onReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
