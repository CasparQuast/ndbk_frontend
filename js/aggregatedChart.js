const ctx = document.getElementById('aggregatedChart').getContext('2d');
const aggregatedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Time windows
        datasets: [{
            label: 'Aggregated Total Trades',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Zeitfenster' } },
            y: { title: { display: true, text: 'Total Trades' }, beginAtZero: true },
        },
    },
});

export const updateAggregatedChart = (data) => {
    const timeWindow = `${data.time_from} - ${data.time_to}`;
    const totalTrades = data.totalTrades;

    // Check if time window already exists
    const existingIndex = aggregatedChart.data.labels.indexOf(timeWindow);

    if (existingIndex !== -1) {
        aggregatedChart.data.datasets[0].data[existingIndex] = totalTrades;
    } else {
        aggregatedChart.data.labels.push(timeWindow);
        aggregatedChart.data.datasets[0].data.push(totalTrades);
    }

    // Limit chart to last 20 data points
    while (aggregatedChart.data.labels.length > 20) {
        aggregatedChart.data.labels.shift();
        aggregatedChart.data.datasets[0].data.shift();
    }

    aggregatedChart.update();
};



