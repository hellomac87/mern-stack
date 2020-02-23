import React, { useEffect, useState } from "react";
import Axios from "axios";

const Subscribe = ({ userTo }) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variable = {
      userTo
    };
    Axios.post(`/api/subscribe/subscribeNumber`, variable).then(res => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    let subscribedVariable = {
      userTo,
      userFrom: localStorage.getItem("userId")
    };
    Axios.post(`/api/subscribe/subscribed`, subscribedVariable).then(res => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("정보를 받아오지 못했습니다.");
      }
    });
  }, []);
  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase"
        }}
        onClick
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
