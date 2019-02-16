import {lineChartService, lineChartAddService} from "../service/line-chart-service"
import { COLLECTION_LIST, API_ERROR, UPDATE_CHART_DATA,
    UPDATE_X_VALUE, UPDATE_Y_VALUE, ADD_API_ERROR } from "../constants";

export const getCollectionData = () => async (dispatch) => {
    try {
        const response = await lineChartService();
        dispatch({
            type: COLLECTION_LIST,
            payload: response.data.values
        })
    } catch (error) {
        dispatch({
            type: API_ERROR
        });
    }
};

export const updateChartDataAction = (xValue, yValue) => async (dispatch) => {
    try {
        const response = await lineChartAddService(xValue, yValue);
        dispatch({
            type: UPDATE_CHART_DATA,
            payload: { xValue, yValue, status: response.status}
        })
    } catch (error) {
        dispatch({
            type: ADD_API_ERROR
        });
    }
};

export const updateXValueAction = (xValue) => {
    return {
        type: UPDATE_X_VALUE,
        payload: xValue
    }
};

export const updateYValueAction = (yValue) => {
    return {
        type: UPDATE_Y_VALUE,
        payload: yValue
    }
};