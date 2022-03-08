import PositionCheckList from "../../Components/Ui/PositionCheckList";
import { bool, func } from "prop-types";
import { useState } from "react";

export default {
  title: "UI/PositionCheckList",
  component: PositionCheckList,
  argTypes: {
    all: bool,
    multi: bool,
    defaultColor: { control: "color" },
    hoverColor: { control: "color" },
  },
};

const Template = (args) => {
  const [position, setPosition] = useState({
    all: false,
    top: false,
    jng: false,
    mid: false,
    bot: false,
    sup: false,
  });

  return (
    <PositionCheckList
      position={position}
      setPosition={setPosition}
      {...args}
    />
  );
};

export const Default = Template.bind({});
