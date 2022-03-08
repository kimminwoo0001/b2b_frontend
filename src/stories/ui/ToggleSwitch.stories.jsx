import ToggleSwitch from "../../Components/Ui/ToggleSwitch/ToggleSwitch";
import { bool, func, string } from "prop-types";
import { useState } from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "UI/ToggleSwitch",
  component: ToggleSwitch,
  argTypes: {
    className: string,
    checked: bool,
    disable: bool,
  },
};

const Template = (args) => {
  let checked = false;

  return (
    <ToggleSwitch
      checked={checked}
      onChange={action("onChange", !checked)}
      {...args}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  checked: false,
  disabled: false,
  onChange: () => {},
  className: "input_classname",
};
