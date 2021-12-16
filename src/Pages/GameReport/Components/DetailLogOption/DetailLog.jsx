import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { InitializeGameState } from "../../../../redux/modules/gamevalue";

const DetailLog = () => {
  const gamevalue = useSelector((state) => state.GameReportReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <LogContainer>
      <NavContainer>
        <img
          onClick={() => {
            dispatch(InitializeGameState());
          }}
          src={"Images/ic_close_bk_30.svg"}
          alt="question"
        />
        <span>{gamevalue.uniqueId}</span>
      </NavContainer>
      <LogDetailContainer>
        <LogTitle>
          <div>
            <span>{t("game.log.event.subject")}</span>
            <img src={"Images/ico-question-mark.svg"} alt="question" />
          </div>
        </LogTitle>
        <LogContentBox>
          <LogContent isActive={false} team={"red"}>
            <div className="title">
              <div className="dot"></div>
              <span>{`10:12 오브젝트 획득`}</span>
            </div>
          </LogContent>
          <LogContent isActive={true} team={"red"}>
            <div className="title">
              <div className="dot"></div>
              <span>{`10:12 오브젝트 획득`}</span>
            </div>
          </LogContent>
          <LogContent isActive={false} team={"blue"}>
            <div className="title">
              <div className="dot"></div>
              <span>{`10:12 오브젝트 획득`}</span>
            </div>
          </LogContent>
        </LogContentBox>
      </LogDetailContainer>
      <LogDetailContainer>
        <LogTitle>
          <span>{t("game.log.status.subject")}</span>
          <img src={"Images/ico-question-mark.svg"} alt="question" />
        </LogTitle>
        <LogContentBox>
          <LogContent isActive={false} team={"blue"}></LogContent>
          <LogContent isActive={true} team={"blue"}></LogContent>
          <LogContent isActive={false} team={"blue"}></LogContent>
        </LogContentBox>
      </LogDetailContainer>
      {/* <LogDetailContainer>
        <LogTitle>
          <span> {t("game.log.detail.subject")}</span>
          <img src={"Images/ico-question-mark.svg"} alt="question" />
        </LogTitle>
        <LogContentBox>
          <LogContent isActive={false} team={"red"}></LogContent>
          <LogContent isActive={true} team={"red"}></LogContent>
          <LogContent isActive={false} team={"red"}></LogContent>
        </LogContentBox>
      </LogDetailContainer> */}
    </LogContainer>
  );
};

export default DetailLog;

const LogContainer = styled.div`
  width: 240px;
  height: 1080px;
  padding: 0;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  display: block;
`;

const LogDetailContainer = styled.div`
  width: 200px;
  height: 502px;
  margin: 0px 14px 13px 26px;
  padding: 10px 10px 0;
  border-radius: 20px;
  background-color: #23212a;
  overflow: hidden;
`;

const NavContainer = styled.div`
  width: 240px;
  height: 55px;
  padding: 10px 2px 16px 10px;
  box-shadow: 5px 5px 30px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  white-space: nowrap;

  img {
    width: 29px;
    height: 29px;
    object-fit: contain;
    vertical-align: bottom;
    cursor: pointer;
  }

  span {
    font-family: SpoqaHanSansNeo;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
    margin-top: 5px;
  }
`;

const LogTitle = styled.div`
  width: auto;
  height: 21px;
  span {
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.63;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }

  img {
    width: 15px;
    height: 15px;
    margin: -5px 0 0px 5px;
    object-fit: contain;
    vertical-align: middle;
  }
`;

const LogContentBox = styled.div`
  width: 180px;
  height: 289px; // auto
  overflow-y: hidden;
  margin: 10px 0 0;
`;

const LogContent = styled.div`
  width: 180px;
  height: 76px;
  margin: 5px 0;
  padding: 8px 0px 8px 0px;
  border-radius: 10px;
  background-color: #000;
  opacity: ${(props) => (props.isActive ? `1` : `0.3`)};
  border: solid 2px
    ${(props) =>
      props.isActive && (props.team === "red" ? `#f04545` : `#0075bf`)};

  .title {
    display: flex;
    height: 19px;
    margin: 0 5px 4px;
    //background-color: #f00;
    span {
      font-family: SpoqaHanSansNeo;
      font-size: 15px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.15;
      letter-spacing: normal;
      text-align: left;
      color: #fff;
    }
  }

  .dot {
    width: 6px;
    height: 6px;
    margin: 7px 5px 10px 2px;
    background-color: ${(props) =>
      props.team === "red" ? `#f04545` : `#0075bf`};
    border-radius: 10px;
  }
`;
