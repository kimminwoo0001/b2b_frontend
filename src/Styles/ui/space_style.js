import { css } from "@emotion/react";

const spaceStyle = {
  space: (type, num) => {
    const spacing = 4;
    let result = "";
    switch (type) {
      case "mx":
        result = css`
          margin: 0 ${spacing * num}px;
        `;

        break;
      case "my":
        result = css`
          margin: ${spacing * num}px;
        `;
        break;
      case "mr":
        result = css`
          margin-right: ${spacing * num}px;
        `;
        break;
      case "ml":
        result = css`
          margin-left: ${spacing * num}px;
        `;
        break;
      case "mt":
        result = css`
          margin-top: ${spacing * num}px;
        `;
        break;
      case "mb":
        result = css`
          margin-bottom: ${spacing * num}px;
        `;

        break;
      case "px":
        result = css`
          padding: 0 ${spacing * num}px;
        `;

        break;
      case "py":
        result = css`
          padding: ${spacing * num}px 0;
        `;
        break;
      case "pr":
        result = css`
          padding-right: ${spacing * num}px;
        `;
        break;
      case "pl":
        result = css`
          padding-left: ${spacing * num}px;
        `;
        break;
      case "pt":
        result = css`
          padding-top: ${spacing * num}px;
        `;
        break;
      case "pb":
        result = css`
          padding-bottom: ${spacing * num}px;
        `;
        break;
      default:
        break;
    }

    return result;
  },
};

export default spaceStyle.space;
