export const darkChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#e5e7eb', // gray-200
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: '#111827', // gray-900
      titleColor: '#f9fafb',
      bodyColor: '#e5e7eb',
      borderColor: '#374151',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#9ca3af', // gray-400
      },
      grid: {
        color: '#1f2937',
      },
    },
    y: {
      ticks: {
        color: '#9ca3af',
      },
      grid: {
        color: '#1f2937',
      },
    },
  },
};
