import React, { useEffect, useState } from "react";
import { Card, Icon, Typography, Row, Col, Avatar } from "antd";
import moment from "moment";
import Axios from "axios";
const { Title } = Typography;
const { Meta } = Card;

const SubscriptionPage = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    //
    let subscriptionVariables = {
      userFrom: localStorage.getItem("userId")
    };
    Axios.post("/api/video/getSubscriptionVideos", subscriptionVariables).then(
      res => {
        if (res.data.success) {
          setVideos(res.data.videos);
        } else {
          alert("비디오 가져오기를 실패 했습니다.");
        }
      }
    );
  }, []);

  const renderCards = videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className={"duration"}>
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description={""}
        />
        <span>{video.writer.name}</span>
        <span style={{ marginLeft: "3rem" }}>{video.views} views </span> -
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });
  return (
    <>
      <div style={{ wudth: "85%", margin: "3rem auto" }}>
        <Title level={2}>Recommended</Title>
        <hr />
        <Row gutter={[32, 16]}>{renderCards}</Row>
      </div>
    </>
  );
};

export default SubscriptionPage;
