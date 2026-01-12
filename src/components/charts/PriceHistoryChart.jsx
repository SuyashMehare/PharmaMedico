import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { darkChartOptions } from './chartConfig';

// Register once
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const PriceHistoryChart = ({ priceHistory = [] }) => {
    if (!priceHistory.length) {
        return (
            <div className="text-gray-400 text-sm">
                No price history available.
            </div>
        );
    }

    // Sort by time (important!)
    const sortedHistory = [...priceHistory].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const data = {
        labels: sortedHistory.map(item =>
            new Date(item.createdAt).toLocaleString()
        ),
        datasets: [
            {
                label: 'Price',
                data: sortedHistory.map(item => item.price),
                borderColor: '#22c55e', // green-500
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    return (
        <div
            style={{ height: '350px' }}
            className="bg-gray-900 rounded-xl p-4 shadow-md"
        >
            <Line data={data} options={darkChartOptions} />
        </div>
    );
};

export default PriceHistoryChart;
