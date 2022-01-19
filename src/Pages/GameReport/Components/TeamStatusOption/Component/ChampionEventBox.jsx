import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import secToMS from "../../../../../lib/secToMS";
import { useEffect } from "react";
import {
  SetSeletedStatusText,
  SetSeletedStatusTime,
  SetSeletedStatusType,
} from "../../../../../redux/modules/gamevalue";
import { useDispatch } from "react-redux";

const ChampionEventBox = ({
  isDeath,
  isOpp,
  status,
  time,
  isMax,
  participant,
  playerStatusTime,
}) => {
  const { t } = useTranslation();
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const [event, setEvent] = useState({
    type: "",
    time: 0,
    text: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setEvent({
      type: "",
      time: time,
      text: "",
    });
  }, []);

  const setSelectedStatus = (time, type, text) => {
    console.log(time, type, text);
    if (gamevalue.selectedStatusType !== type) {
      console.log("input text:", text);
      dispatch(SetSeletedStatusTime(time));
      dispatch(SetSeletedStatusType(type));
      dispatch(SetSeletedStatusText(text));
    }
  };

  const getStatue = () => {
    const type = {
      type: status.type,
      time: time,
      text: t(`game.teamStatus.player.${status.type}`),
    };

    // text에 .teamStatus.가 있으면 변환이 안되는 것으로 ""(공백)처리를 하도록 임의로 지정
    if (isMax) {
      if (status.type !== event.type) {
        if (type.text === "" || type.text.includes(".teamStatus.")) {
          setEvent({
            type: status.type,
            time: 0,
            text: "",
          });
        } else {
          setEvent(type);
        }
      }
    } else if (status.type !== event.type) {
      if (type.text === "" || type.text.includes(".teamStatus.")) {
        setEvent({
          type: status.type,
          time: 0,
          text: "",
        });
      } else {
        setEvent(type);
      }
    }
    if (gamevalue.selectedParticipant === participant) {
      console.log("Event", event);
      setSelectedStatus(event.time, event.type, event.text);
    }
  };

  useEffect(() => {
    getStatue();
  }, [time]);

  return (
    <EventBox isDeath={isDeath || isMax} isOpp={isOpp}>
      {/* {isOpp && <div className="event-img"></div>} */}
      <div className="desc">
        <div className="time">{event.time > 0 && secToMS(event.time)}</div>
        <div className="status">{event.text}</div>
      </div>
      {/* {!isOpp && <div className="event-img"></div>} */}
    </EventBox>
  );
};

export default ChampionEventBox;

const EventBox = styled.div`
  ${(props) => props.isDeath && `opacity: 0.3;`};
  margin: 10px 0 6px 2px;
  width: 100%;
  height: 28px;
  display: flex;
  .desc {
    width: 88px;
    height: 28px;
    .time {
      height: 13px;
      font-family: SpoqaHanSansNeo;
      font-size: 10px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: ${(props) => (props.isOpp ? "right" : "left")};
      color: #fff;
    }
    .status {
      font-family: SpoqaHanSansNeo;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: ${(props) => (props.isOpp ? "right" : "left")};
      color: #fff;
    }
  }
  .event-img {
    visibility: hidden;
    margin-left: 2px;
    width: 28px;
    height: 28px;
    object-fit: contain;
    background-color: #fff;
  }
`;
