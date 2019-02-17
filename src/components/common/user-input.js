import React from "react";
import { string, func } from "prop-types";
import { isEmpty } from "lodash";
import { isNumber } from "../common/common-helper";

const UserInput = ({ xValue, yValue, showDataOnChart, onXChange, onYChange }) => {
  return (
    <form className="col-12">
      <div className="form-group col-4">
        <label htmlFor="xValue">Enter X Coordinate:</label>
        <input type="date" className="form-control" id="xValue" placeholder="X Value"
          value={xValue} onChange={onXChange} />
      </div>
      <div className="form-group col-4">
        <label htmlFor="yValue">Enter Y Coordinate:</label>
        <input type="text" pattern="^[0-9]*$" className="form-control" id="yValue" placeholder="Y Value"
          value={yValue} onChange={onYChange} />
      </div>
      <button disabled={(isNumber(yValue)) || isEmpty(xValue)} onClick={showDataOnChart} type="button" className="col-2 btn btn-primary show-on-chart">Show On Chart</button>
    </form>
  );
};

UserInput.propTypes = {
  xValue: string,
  yValue: string,
  showDataOnChart: func,
  onXChange: func,
  onYChange: func
};

export default UserInput;
