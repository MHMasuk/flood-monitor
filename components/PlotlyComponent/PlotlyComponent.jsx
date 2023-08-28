import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';

const Plot = createPlotlyComponent(Plotly);

const PlotComponent = () => {
    return (
        <Plot
            data={[
                {
                    type: 'scatter',
                    mode: 'lines+points',
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    marker: { color: 'red' }
                },
                {
                    type: 'bar',
                    x: [1, 2, 3],
                    y: [2, 5, 3]
                }
            ]}
            layout={{
                width: 640,
                height: 480,
                title: 'A Fancy Plot'
            }}
        />
    );
};

export default PlotComponent;
