import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { array, string, bool } from "prop-types";
import * as d3 from "d3";
import moment from 'moment';
import { SVG_WIDTH, SVG_HEIGHT, SVG_MARGIN } from "../../constants";
import { getLineChartDataAction, updateChartDataAction, updateXValueAction, updateYValueAction } from "./line-chart-actions";
import UserInput from "../common/user-input"
import ApiFailureBox from "../common/api-failure-box";
import Loader from "../common/loader";

class LineChart extends Component {

  componentDidMount() {
    
    // Call the action to fetch the line chart data from API
    this.props.getLineChartDataAction();
  };

  // This method will get call on "Show On Chart" button click
  showDataOnChart = () => {
    const { xValue, yValue } = this.props;

    // Call the action to send the newly entered points to API
    this.props.updateChartDataAction(xValue, yValue);
  };

  onXChange = (e) => {

    // Call the action to update the redux state with newly entered xValue
    this.props.updateXValueAction(e.target.value);
  };

  onYChange = (e) => {

    // Call the action to update the redux state with newly entered yValue
    this.props.updateYValueAction(e.target.value);
  };

  render() {
    const { data, xValue, yValue, apiFailureMsg, showLoader } = this.props;
    const h = SVG_HEIGHT - 2 * SVG_MARGIN, w = SVG_WIDTH - SVG_MARGIN
    if (data && data.length > 0) {

      //x scale
      const x = d3.scaleTime().domain(d3.extent(data, d => new Date(d.x))).range([SVG_MARGIN, w]);

      //y scale
      const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([h, SVG_MARGIN + 10])

      const line = d3.line()
        .x(d => x(new Date(d.x)))
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX)

      const xTicks = x.ticks(6).map(d => (
        <g className="axis-labels" transform={`translate(${x(d)},${h + SVG_MARGIN})`}>
          <text className="x-axis-labels">{moment.parseZone(new Date(d)).format()}</text>
          <line className='gridline' x1={x(new Date(d.x))} y1='0' y2={h - SVG_MARGIN} x2={x(new Date(d.x))} transform="translate(25, -410)" />
        </g>
      ));

      const yTicks = y.ticks(4).map(d => (
        <g className="axis-labels" transform={`translate(${SVG_MARGIN},${y(d)})`}>
          <text x="-12" y="5">{d}</text>
          <line className='gridline' x1="0" x2={w - SVG_MARGIN} y1={y(d.y)} y2='0' transform="translate(-5,0)" />
        </g>
      ));

      // This will show the dots for each data coordinates (x, y) on the chart
      const dotsOnChart = data.map(d => <circle className="dots" cx={x(new Date(d.x))} cy={y(d.y)} r="4" />);

      return (
        <div className="container">
          <div className="row">
            <UserInput
              xValue={xValue}
              yValue={yValue}
              showDataOnChart={this.showDataOnChart}
              onXChange={this.onXChange}
              onYChange={this.onYChange}
            />
          </div>
          {
            // If any API call gets failed, display ApiFailureBox component to display the API msg. For now it is a static msg.
            apiFailureMsg && (<div className="row">
              <ApiFailureBox msg={apiFailureMsg} />
            </div>)
          }
          <div className="row">
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              
              {/*X axis*/}
              <line className="axis" x1={SVG_MARGIN} x2={w} y1={h} y2={h} />

              {/*Y axis*/}
              <line className="axis" x1={SVG_MARGIN} x2={SVG_MARGIN} y1={SVG_MARGIN + 10} y2={h} />
              <path d={line(data)} />
              {xTicks}
              {yTicks}
              {dotsOnChart}
            </svg>
          </div>
        </div>
      );
    }
    return ( showLoader && <Loader />);
  }
}

LineChart.propTypes = {
  data: array,
  xValue: string,
  yValue: string,
  apiFailureMsg: string,
  showLoader: bool
};

const mapStateToProps = (state) => {
  return {
    data: state.lineChart.data,
    xValue: state.lineChart.xValue,
    yValue: state.lineChart.yValue,
    apiFailureMsg: state.lineChart.apiFailureMsg,
    showLoader: state.lineChart.showLoader
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getLineChartDataAction, updateChartDataAction, updateXValueAction,
    updateYValueAction
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
