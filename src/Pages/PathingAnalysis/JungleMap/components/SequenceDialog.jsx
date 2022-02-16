import React from "react";
import styled from "@emotion/styled";
// ui
import EventLog from "../../../../Components/Ui/Dialog/EventLog";
import Avatar from "../../../../Components/Ui/Avatar";
// style
import { scrollbarStyle, typoStyle } from "../../../../Styles/ui";

const SequenceDialog = ({ ...props }) => {
  return (
    <SContainer {...props}>
      <SDialogContainer color={"red"}>
        <h4>
          <em aria-hidden></em>RED사이드
        </h4>
        <SEventlogContainer>
          <EventLog index={1} time={"02:00"} color="red">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              />
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              />
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>

          <EventLog index={1} time={"02:00"} color="red">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              />
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              />
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>

          <EventLog index={1} time={"02:00"} color="red">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              />
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              />
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>

          <EventLog index={1} time={"02:00"} color="red">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              />
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              />
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>

          <EventLog index={1} time={"02:00"} color="red">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              />
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              />
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>
        </SEventlogContainer>
      </SDialogContainer>
      <SDialogContainer color={"blue"}>
        <h4>
          <em aria-hidden></em>BLUE사이드
        </h4>
        <SEventlogContainer>
          <EventLog index={1} time={"02:00"} color="blue">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              ></Avatar>
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              ></Avatar>
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>
          <EventLog index={1} time={"02:00"} color="blue">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              ></Avatar>
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              ></Avatar>
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>
          <EventLog index={1} time={"02:00"} color="blue">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              ></Avatar>
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              ></Avatar>
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>
          <EventLog index={1} time={"02:00"} color="blue">
            <SMessage>
              <Avatar
                src="images/champion/teemo.png"
                alt="티모"
                block={false}
                color={"blue"}
                size={16}
              ></Avatar>
              티모가
              <Avatar
                src="images/champion/Renekton.png"
                alt="악어"
                color={"red"}
                block={false}
                size={16}
              ></Avatar>
              레넥톤을 잡고 버섯을 깔고 용도 잡고 와드도 박고 여러가지를 하면
              두줄이 됩니다
            </SMessage>
          </EventLog>
        </SEventlogContainer>
      </SDialogContainer>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;

  div {
    flex: 1;
  }

  > div:first-of-type {
    margin-right: 20px;
  }
`;

const SDialogContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_select};
  border-radius: 20px;

  h4 {
    display: flex;

    ${typoStyle.contents_title}
    padding: 10px 15px;

    em {
      display: inline-block;
      margin-right: 8px;
      width: 3px;
      height: 20px;
      background-color: ${({ theme, color }) =>
        color === "red" ? theme.colors.badge_red : theme.colors.badge_blue};
    }
  }
`;

const SEventlogContainer = styled.div`
  padding: 0 10px;
  margin-bottom: 20px;
  height: 220px;
  overflow-y: overlay;
  ${scrollbarStyle.scroll}

  > div:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const SMessage = styled.div`
  ${typoStyle.eventlog}
`;

export default SequenceDialog;
