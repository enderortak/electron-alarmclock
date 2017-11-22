import React from "react";
import propTypes from "prop-types";


const Content = ({ children }) => (
  <div id="content-wrapper" className="flex-container">
    <div className="content flex-container">
      {children}
    </div>
  </div>
);

Content.propTypes = {
  children: propTypes.node.isRequired,
};

export default Content;

