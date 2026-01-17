import { Line } from "react-chartjs-2";
import { darkChartOptions } from "./chartConfig";

const PriceHistoryChart = ({ priceHistory = [], currency = "INR" }) => {
    const sortedHistory = [...priceHistory].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const data = {
        labels: sortedHistory.map(item =>
            new Date(item.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
            })
        ),
        datasets: [
            {
                label: `Price (${currency})`,
                data: sortedHistory.map(item => item.price),
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6,
            },
        ],
    };

    return (
        <div className="h-[350px] bg-gray-900 rounded-2xl p-4">
            <Line data={data} options={darkChartOptions} />
        </div>
    );
};

export default PriceHistoryChart;
