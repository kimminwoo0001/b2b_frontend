/** @jsxImportSource @emotion/react */
import { string } from "prop-types";
import NotFound from "../../Components/Ui/Error/NotFound";

export default {
  title: "UI/NotFound",
  component: NotFound,
  argTypes: {
    text: string,
  },
};

const Template = (args) => <NotFound {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: "데이터를 입력받지 못했습니다",
};

export const ComponentsType = Template.bind({});

ComponentsType.args = {
  text: (
    <span css={{ color: "blue" }}>메세지를 jsx return 으로 가져왔습니다</span>
  ),
};
