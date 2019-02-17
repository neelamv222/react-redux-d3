import React from "react";
import { string } from "prop-types";

const ApiFailureBox = ({ msg }) => {
  return (
    <p className="error">{msg}</p>
  );
};

ApiFailureBox.propTypes = {
  msg: string
};

export default ApiFailureBox;
