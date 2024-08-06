import React, {useState} from "react";
import Plot from 'react-plotly.js'

function Histogram() {
    var x = [];
    for (var i = 0; i < 500; i ++) {
        x[i] = Math.random();
    }

    var trace = {
        x: x,
        type: 'histogram',
    };
    const data = [trace]
    return (
        <Plot
            data={data}
        />
    )
}

export default Histogram