import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

const VideoDetailPage = props => {
  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

  const videoId = props.match.params.videoId;
  useEffect(() => {
    const varidable = {
      videoId
    };
    Axios.post("/api/video/getVideoDetail", varidable).then(res => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    });

    Axios.post(`/api/comment/getComment`, varidable).then(res => {
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        alert("코멘트 정보를 가져오길 실패했습니다.");
      }
    });
  }, [videoId]);

  const refreshFunc = useCallback(
    newComments => {
      setComments(comments.concat(newComments));
    },
    [comments]
  );

  if (videoDetail.writer) {
    const subscribeButton = videoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe
        userTo={videoDetail.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100$", padding: "3rem, 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoDetail.filePath}`}
              controls
            />

            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name}
                description={videoDetail.writer.description}
              />
            </List.Item>

            {/* Comments */}
            <Comment
              postId={videoId}
              commentList={comments}
              refreshFunc={refreshFunc}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
};

export default VideoDetailPage;
