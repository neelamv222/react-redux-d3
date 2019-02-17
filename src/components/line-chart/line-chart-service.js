import axios from 'axios';

// asyc call to fetch data to plot line Chart.
export const lineChartService = () => {
  return axios.get("http://konuxdata.getsandbox.com/data");
};

// asyc call to post the newly entered data.
export const lineChartAddService = (xValue, yValue) => {
  return axios.post("http://konuxdata.getsandbox.com/points", {x: xValue, y:yValue});
};
