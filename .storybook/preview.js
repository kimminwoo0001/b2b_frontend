import { colors } from "../src/Styles/ui";

export const parameters = {
  // action
  actions: { argTypesRegex: "^on[A-Z].*" },
  // control
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // background
  backgrounds: {
    default: "bg_gnb",
    values: [
      {
        name: "bg_gnb",
        value: colors.bg_gnb,
      },
      {
        name: "facebook",
        value: "#3b5998",
      },
    ],
  },
};
