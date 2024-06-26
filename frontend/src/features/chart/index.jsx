import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, PieChart, ColumnChart, BarChart, AreaChart, ScatterChart, GeoChart, Timeline } from 'react-chartkick'
import 'chartkick/chart.js'
// Generate 20 points with random coordinates
const input = Array.from({ length: 20 }, () => [
    parseFloat((Math.random() * (200 - 150) + 150).toFixed(1)),
    parseFloat((Math.random() * (90 - 70) + 70).toFixed(1)),
]);
const data = [
    { name: "Workout", data: { "2021-01-01": 3, "2021-01-02": 4 } },
    { name: "Call parents", data: { "2021-01-01": 5, "2021-01-02": 3 } },
    { name: "Workout", data: { "2021-01-01": 2, "2021-01-02": 7 } },
    { name: "Call parents", data: { "2021-01-01": 6, "2021-01-02": 9 } }
];
Chart.propTypes = {

};

function Chart(props) {
    return (
        <div className="center">
            <LineChart data={{ "2021-01-01": 11, "2021-01-02": 6 }} />
            {/* <PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} />
<ColumnChart data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} />
<BarChart data={[["Work", 32], ["Play", 1492]]} />
<AreaChart data={{"2021-01-01": 11, "2021-01-02": 6}} /> */}
            <ScatterChart data={input} xtitle="Size" ytitle="Population" />
            {/* <GeoChart data={[["United States", 44], ["Germany", 23], ["Brazil", 22]]} />
<Timeline data={[["Washington", "1789-04-29", "1797-03-03"], ["Adams", "1797-03-03", "1801-03-03"]]} /> */}
            <LineChart data={data} />
        </div>
    );
}

export default Chart;