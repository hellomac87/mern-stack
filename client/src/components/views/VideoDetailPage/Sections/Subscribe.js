import React, { useEffect, useState } from "react";
import Axios from "axios";

const Subscribe = ({ userTo, userFrom }) => {
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
      userFrom
    };
    Axios.post(`/api/subscribe/subscribed`, subscribedVariable).then(res => {
      if (res.data.success) {
        setSubscribed(res.data.subscribe);
      } else {
        alert("정보를 받아오지 못했습니다.");
      }
    });
  }, []);

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom
    };

    if (subscribed) {
      //이미 구독중이라면
      Axios.post(`/api/subscribe/unSubscribe`, subscribeVariable).then(res => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber - 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독 취소에 실패 했습니다.");
        }
      });
    } else {
      // 아직 구독중이 아니라면
      Axios.post(`/api/subscribe/subscribe`, subscribeVariable).then(res => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독에 실패 했습니다.");
        }
      });
    }
  };

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
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
