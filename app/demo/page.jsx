"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Filler } from 'react-chartjs-2';
import faker from 'faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart with Danger Levels',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dangerLevel = 800; // Set your danger level here

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export default function Demo() {

    return (
        <main className="mt-2 px-5 mb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div className="bg-white p-1 rounded-lg shadow-md">
                    <Line options={options} data={data}>
                        <Filler target="y" from={dangerLevel} to={Math.max(...data.datasets.flatMap(dataset => dataset.data))} color="rgba(255, 0, 0, 0.2)" />
                    </Line>
                </div>

                <div className="bg-white p-1 rounded-lg shadow-md">

                </div>

                <div className="bg-white p-1 rounded-lg shadow-md">

                </div>

                <div className="bg-white p-1 rounded-lg shadow-md">

                </div>


            </div>
        </main>
    )
}
