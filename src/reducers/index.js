import { combineReducers } from "redux";

import LineChartReducer from "../components/line-chart/line-chart-reducer";

const allReducers = combineReducers({
    lineChart: LineChartReducer // Likewise other reducers can also be added here.
});

export default allReducers;
