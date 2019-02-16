import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { array, string } from "prop-types";
import * as d3 from "d3";
import moment from 'moment';
import { getCollectionData, updateChartDataAction, updateXValueAction, updateYValueAction } from "./line-chart-actions";
import { SVG_WIDTH, SVG_HEIGHT, SVG_MARGIN } from "../../constants";
import UserInput from "../common/user-input"
import ApiFailureBox from "../common/api-failure-box";

class LineChart extends Component {

    componentWillMount() {
        this.props.getCollectionData();
    }

    showDataOnChart = () => {
        const { lineChart: {xValue, yValue} } = this.props;
        // var monthNameFormat = d3.timeFormat("%Y-%m-%dT%H:%M:%S%Z");
        console.log(moment(new Date(xValue)).format());
        this.props.updateChartDataAction(xValue, yValue);
    }

    onXChange = (e) => {
        this.props.updateXValueAction(e.target.value);
    }
    onYChange = (e) => {
        this.props.updateYValueAction(e.target.value);
    }
    /** 
     * When component gets loaded, depending upon the pathName, it will show the particular category of collections.
     */
    render() {
        const { lineChart } = this.props;
        const { data, xValue, yValue, apiFailureMsg, areBothFieldsEmpty} = lineChart || {};
        const h = SVG_HEIGHT - 2 * SVG_MARGIN, w = SVG_WIDTH - SVG_MARGIN
        if (data && data.length > 0) {


            //x scale
            const x = d3.scaleTime().domain(d3.extent(data, d => new Date(d.x))).range([SVG_MARGIN, w]); //domain: [min,max] of a

            //y scale
            const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([h, SVG_MARGIN + 10])

            const line = d3.line()
                .x(d => x(new Date(d.x)))
                .y(d => y(d.y))
                .curve(d3.curveMonotoneX) //curve line

            const xTicks = x.ticks(8).map(d => (
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

            const dotsOnChart = data.map(d => <circle className="dots" cx={x(new Date(d.x))} cy={y(d.y)} r="4" />);

            return (
                <div className="container">
                    <div className="row">
                        <UserInput
                            xValue={xValue}
                            yValue={yValue}
                            areBothFieldsEmpty={areBothFieldsEmpty}
                            showDataOnChart={this.showDataOnChart}
                            onXChange={this.onXChange}
                            onYChange={this.onYChange}
                        />
                    </div>
                    {
                        apiFailureMsg && (<div className="row">
                            <ApiFailureBox msg={apiFailureMsg} />
                        </div>)
                    }
                    <div className="row">
                        <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
                            <line className="axis" x1={SVG_MARGIN} x2={w} y1={h} y2={h} />
                            <line className="axis" x1={SVG_MARGIN} x2={SVG_MARGIN} y1={SVG_MARGIN + 10} y2={h} />
                            <path d={line(data)} />
                            {xTicks}
                            {yTicks}
                            {dotsOnChart}
                        </svg>
                    </div>
                </div>
            )

        }
        return (<ApiFailureBox msg={apiFailureMsg} />);
    }



}

LineChart.propTypes = {
    data: array,
    xValue: string,
    yValue: string
};

export const mapStateToProps = (state) => {
    return {
        lineChart: state.lineChart
    };
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCollectionData, updateChartDataAction, updateXValueAction,
        updateYValueAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

