import React from "react";
import LineChart from "./components/line-chart/line-chart";
import "./App.css"

const App = () => {
  return (
    <div className="my-fav-collection">
      {/* Depending upon the path, it will show either books, movies, games or foods collection */}
      <div className="content">
        <LineChart />
      </div>
    </div>
  )
}
export default App;
