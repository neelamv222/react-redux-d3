import { sortBy } from "lodash";
import moment from 'moment';
import { LINE_CHART_DATA, FETCH_API_ERROR, UPDATE_CHART_DATA, UPDATE_X_VALUE, UPDATE_Y_VALUE,
  ADD_API_ERROR, FETCH_API_MSG, POST_API_MSG
} from "../../constants";

const initialState = {
  apiFailureMsg: "",
  data: [],
  showLoader: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case LINE_CHART_DATA:
      return Object.assign({}, state,
        {
          data: sortBy(payload, [function (o) { return o.y; }]),
          isApiFail: false,
          showLoader: false
        }
      );

    case UPDATE_CHART_DATA: {
      const { xValue, yValue, status } = payload;
      return status === 200 ? Object.assign({}, state,
        {data: state.data.concat({ x: moment(new Date(xValue)).format(), y: yValue }),
        showLoader: false}) : Object.assign({}, state, {showLoader: false});
    }

    case UPDATE_X_VALUE: {
      return Object.assign({}, state,
        {
          xValue: payload
        }
      );
    }

    case UPDATE_Y_VALUE: {
      return Object.assign({}, state,
        {
          yValue: payload
        }
      );
    }

    case FETCH_API_ERROR:
      return Object.assign({}, state,
        {
          data: undefined,
          apiFailureMsg: FETCH_API_MSG,
          showLoader: false
        }
      );

    case ADD_API_ERROR:
      return Object.assign({}, state,
        {
          apiFailureMsg: POST_API_MSG,
          showLoader: false
        }
      );

    default:
      return state;
  }
}
