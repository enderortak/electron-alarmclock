import React from "react";
import propTypes from "prop-types";
import "../../../style/components/window/WindowContent.scss";

console.log(`content ${process.env.NODE_ENV}`);
const WindowContent = ({ children }) => (
  <div id="window-content">
    {children}

  </div>
);

WindowContent.propTypes = {
  children: propTypes.node.isRequired,
};

export default WindowContent;

