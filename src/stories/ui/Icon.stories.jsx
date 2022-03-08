/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Icon, { iconTypes } from "../../Components/Ui/Icons/Icon";
import { colors } from "../../Styles/ui";

export default {
  title: "UI/Icon",
  component: Icon,
  argTypes: {
    icon: { control: "radio", options: [...iconTypes] },
    size: { control: "number" },
    className: { control: "text" },
  },
};

const Template = (args) => <Icon {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: "star",
};

export const CustomSize = Template.bind({});

CustomSize.args = {
  icon: "star",
  size: 24,
};

export const CustomColor = Template.bind({});

CustomColor.args = {
  icon: "star",
  color: colors.badge_red,
};

export const listOfIcons = () => {
  return (
    <ul css={iconListStyle}>
      {iconTypes.map((icon) => (
        <li key={icon}>
          <Icon icon={icon} />
          {icon}
        </li>
      ))}
    </ul>
  );
};

const iconListStyle = css`
  background-color: white;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    width: 25%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      margin-right: 1rem;
    }
  }
`;
