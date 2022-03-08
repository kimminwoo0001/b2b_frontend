/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import * as icons from "./svg";
import PropTypes from "prop-types";

export const iconTypes = Object.keys(icons);

const Icon = ({ icon, color, size, className }) => {
  const SVGIcon = icons[icon];
  return (
    <SVGIcon
      css={{ fill: color || "currentColor", width: size, height: "auto" }}
      className={className}
    ></SVGIcon>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf(iconTypes),
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default Icon;
