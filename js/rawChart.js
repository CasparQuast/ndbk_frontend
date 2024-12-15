let tradeDataBuffer = [];

const ctx = document.getElementById('rawChart').getContext('2d');
const rawChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Trade Price',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Price' }, beginAtZero: false },
        },
    },
});

const processBufferedData = () => {
    if (tradeDataBuffer.length === 0) return;

    tradeDataBuffer.forEach(trade => {
        const tradePrice = parseFloat(trade.p);
        const tradeTime = new Date(trade.E).toLocaleTimeString();

        rawChart.data.labels.push(tradeTime);
        rawChart.data.datasets[0].data.push(tradePrice);

        if (rawChart.data.labels.length > 50) {
            rawChart.data.labels.shift();
            rawChart.data.datasets[0].data.shift();
        }
    });

    tradeDataBuffer = [];
    rawChart.update('none');
};

setInterval(processBufferedData, 1000);

export const bufferTradeData = (trade) => {
    if (trade && !isNaN(parseFloat(trade.p)) && trade.E) {
        tradeDataBuffer.push(trade);
    } else {
        console.error('Invalid trade data:', trade);
    }
};
