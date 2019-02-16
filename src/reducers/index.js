import { combineReducers } from "redux";

import LineChartReducer from "../components/line-chart/line-chart-reducer";

const allReducers = combineReducers({
    lineChart: LineChartReducer
});

export default allReducers;
