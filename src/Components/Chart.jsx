import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ arr, days }) => {

    const prices = [1, 2, 3, 4, 5, 6, 4, 2, 6, 10, 40];
    const date = [];

    for (let i = 0; i < arr.length; i++) {
        if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
        else date.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
    }

    const data = {
        labels: date,
        datasets: [{
            label: `Prices`,
            data: prices,
            borderColor: '#ffc440',
            backgroundColor: '#ffb37d',
        }]
    }
    return (
        <div className="chart">
            <Line options={{
                responsive: true,
            }}
                data={data}
            />
        </div>
    )
}

export default Chart