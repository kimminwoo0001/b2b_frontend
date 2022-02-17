import { string } from "prop-types";
import React from "react";
import Avatar from "../../Components/Ui/Avatar";

export default {
  title: "UI/Avatar",
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    src: string,
    alt: string,
    circle: true,
    size: 20,
    color: { control: "radio", options: [undefined, "red", "blue"] },
    block: true,
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "images/champion/nunu.png",
  alt: "누누",
  circle: true,
  size: 20,

  block: true,
};
