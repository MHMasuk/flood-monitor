"use client";

import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

class LineChart extends React.Component {

    render() {
        const { width, height } = this.props;

        // console.log('width, height', width, height)

        return (
            <div className="">
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {title: 'A Fancy Plot'}}
                style={{
                    width: '100%',
                    height: '100%'
                }}

            />
            </div>
        );
    }
}

LineChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default LineChart;