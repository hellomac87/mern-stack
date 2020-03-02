import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

const LikeDislike = ({ video, videoId, userId, commentId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setdislikeAction] = useState(null);

  let variable = {};

  if (video) {
    variable = {
      videoId,
      userId
    };
  } else {
    variable = {
      commentId,
      userId
    };
  }
  useEffect(() => {
    Axios.post(`/api/like/getLikes`, variable).then(res => {
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikes(res.data.likes.length);

        // 내가 이미 그 좋아요를 눌렀는지
        res.data.likes.map(like => {
          if (like.userId === userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Likes에 정보를 가져오지 못했습니다.");
      }
    });

    Axios.post(`/api/like/getDislikes`, variable).then(res => {
      if (res.data.success) {
        // 얼마나 많은 싫어요를 받았는지
        setDislikes(res.data.dislikes.length);

        // 내가 이미 그 싫어요를 눌렀는지
        res.data.dislikes.map(dislike => {
          if (dislike.userId === userId) {
            setdislikeAction("disliked");
          }
        });
      } else {
        alert("dislikes에 정보를 가져오지 못했습니다.");
      }
    });
  }, [userId, variable]);
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction === "liked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>

      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={dislikeAction === "disliked" ? "filled" : "outlined"}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
    </div>
  );
};

export default LikeDislike;
