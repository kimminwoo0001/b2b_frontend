import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
function SelectObject({ setPeriod, period, setPositionOpen }) {
  //오브젝트별 동선 => 오브젝트 설정
  const { t } = useTranslation();
  return (
    <SelectObjectContainer>
      <SelectTerm>
        <WhichTerm
          onClick={() => {
            setPeriod("all");
          }}
          changeColor={period === "all"}
        >
          <img
            src={
              period === "all"
                ? "Images/ico-team-video-all-on.png"
                : "Images/ico-team-video-all-off.png"
            }
            alt="icon"
          />
          <Labels>
            <Term changeColor={period === "all"}>{t("video.object.all")}</Term>
            <Period changeColor={period === "all"}>
              {t("video.object.all2")}
            </Period>
          </Labels>
        </WhichTerm>
        <WhichTerm
          onClick={() => setPeriod("firstdragon")}
          changeColor={period === "firstdragon"}
        >
          <img
            src={
              period === "firstdragon"
                ? "Images/ico-team-video-dragon-on.png"
                : "Images/ico-team-video-dragon-off.png"
            }
            alt="icon"
          />
          <Labels>
            <Term changeColor={period === "firstdragon"}>
              {t("video.object.dragon")}
            </Term>
            <Period changeColor={period === "firstdragon"}>
              {t("video.object.dragon2")}
            </Period>
          </Labels>
        </WhichTerm>
        <WhichTerm
          onClick={() => setPeriod("seconddragon")}
          changeColor={period === "seconddragon"}
        >
          <img
            src={
              period === "seconddragon"
                ? "Images/ico-team-video-twodragon-on.png"
                : "Images/ico-team-video-twodragon-off.png"
            }
            alt="icon"
          />
          <Labels>
            <Term changeColor={period === "seconddragon"}>
              {t("video.object.twodragon")}
            </Term>
            <Period changeColor={period === "seconddragon"}>
              {t("video.object.twodragon2")}
            </Period>
          </Labels>
        </WhichTerm>
        <WhichTerm
          onClick={() => setPeriod("firstherald")}
          changeColor={period === "firstherald"}
        >
          <img
            src={
              period === "firstherald"
                ? "Images/ico-team-video-herald-on.png"
                : "Images/ico-team-video-herald-off.png"
            }
            alt="icon"
          />
          <Labels>
            <Term changeColor={period === "firstherald"}>
              {t("video.object.herald")}
            </Term>
            <Period changeColor={period === "firstherald"}>
              {t("video.object.herald2")}
            </Period>
          </Labels>
        </WhichTerm>
        {/* <WhichTerm
          onClick={() => setPeriod("firstreturn")}
          changeColor={period === "firstreturn"}
        >
          <img
            src={
              period === "firstreturn"
                ? "Images/ico-team-video-return-on.png"
                : "Images/ico-team-video-return-off.png"
            }
            alt="icon"
          />
          <Labels>
            <Term changeColor={period === "firstreturn"}>
              {t("video.object.return")}
            </Term>
            <Period changeColor={period === "firstreturn"}>
              {t("video.object.return2")}
            </Period>
          </Labels>
        </WhichTerm> */}
      </SelectTerm>
    </SelectObjectContainer>
  );
}

export default SelectObject;

const SelectObjectContainer = styled.div`
  margin: 0 0 0px 0;
`;

const SelectTerm = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const WhichTerm = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 16.5px 0 16.5px 24px;
  width: 161px;
  height: 60px;
  background-color: #3a3745;
  margin-bottom: 10px;
  :nth-child(5) {
    margin-bottom: 0px;
  }
  :hover {
    opacity: 0.8;
  }
  > img {
    width: 22px;
    height: 22px;
    margin: 8px 0px 7px -10px;
    object-fit: contain;
  }
  ${(props) =>
    props.changeColor &&
    css`
      background-color: #23212a;
    `}
`;

const Labels = styled.div`
  margin-left: 13.4px;
`;

const Term = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: normal;
  text-align: left;
  color: #817e90;
  margin-bottom: 1px;
  ${(props) =>
    props.changeColor &&
    css`
      color: #ffffff;
    `}
`;

const Period = styled.div`
  font-family: SpoqaHanSansNeo;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: normal;
  text-align: left;
  color: #6b6979;
  ${(props) =>
    props.changeColor &&
    css`
      color: #ffffff;
    `}
`;
