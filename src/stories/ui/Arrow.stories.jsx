import React from "react";

import Arrow from "../../Components/Ui/Arrow";
import { colors } from "../../Styles/ui";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/Arrow",
  component: Arrow,
  argTypes: {
    direction: { control: "radio", options: ["R", "L", "T", "B"] },
    color: { control: "color" },
    size: {},
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Arrow {...args} />;

export const Default = Template.bind({});

Default.args = {
  color: colors.text,
  size: 8,
  direction: "R",
};
