import { colors } from "../src/Styles/ui";
import { GlobalStyles } from "../src/Styles/GlobalStyles";

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
  colors: {
    default: "white",
    value: [
      {
        name: "white",
        value: colors.text,
      },
    ],
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

export const decorators = [
  (Story, context) => (
    <>
      <GlobalStyles />
      <Story {...context} />
    </>
  ),
];
