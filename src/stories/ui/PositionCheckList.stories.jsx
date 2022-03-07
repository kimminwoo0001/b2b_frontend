import { bool } from "prop-types";
import PositionCheckList from "../../Components/Ui/PositionCheckList";

export default {
  titie: "UI/PositionCheckList",
  component: PositionCheckList,
  argTypes: {
    all: bool,
    multi: bool,
    defaultColor: { control: "colors" },
    hoverColor: { control: "colors" },
    position: {
      all: bool,
      top: bool,
      jng: bool,
      mid: bool,
      bot: bool,
      sup: bool,
    },
  },
};

const Template = (args) => <PositionCheckList {...args} />;

export const Default = Template.bind({});
