import { sortBy} from "lodash";
import moment from 'moment'; 
import {
    COLLECTION_LIST, API_ERROR, UPDATE_CHART_DATA, UPDATE_X_VALUE, 
    UPDATE_Y_VALUE, ADD_API_ERROR, FETCH_API_MSG, POST_API_MSG
} from "../../constants";

const initialState = {
    apiFailureMsg: "",
    data: [],
    areBothFieldsEmpty: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case COLLECTION_LIST:
            return Object.assign({}, state,
                {
                    data: sortBy(payload, [function(o) { return o.y; }]),
                    isApiFail: false
                }
            );
        
        case UPDATE_CHART_DATA: {
            const { xValue, yValue, status } = payload;
            if(status === 200) {
               return  Object.assign({}, state, 
                {
                   data: state.data.concat({x: moment(new Date(xValue)).format(), y: yValue})
                } 
                );
            }
           break;
        }

        case UPDATE_X_VALUE: {
            return Object.assign({}, state,
                {
                    xValue: payload

                });
        }

        case UPDATE_Y_VALUE: {
            return Object.assign({}, state,
                {
                    yValue: payload
                });
        }


        case API_ERROR:
            return Object.assign({}, state,
                {
                    data: undefined,
                    apiFailureMsg: FETCH_API_MSG
                }
            );
        case ADD_API_ERROR: 
            return Object.assign({}, state,
                {
                    apiFailureMsg: POST_API_MSG
                }
            );
        
        default:
            return state;

    }
}
