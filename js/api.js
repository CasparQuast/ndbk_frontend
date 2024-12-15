import { bufferTradeData } from "./rawChart.js";

export const connectToRawSource = () => {
    const rawEvtSource = new EventSource("http://localhost:8085/binance/trades");

    rawEvtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        bufferTradeData(data);
    };

    rawEvtSource.onerror = (err) => {
        console.error('Raw EventSource failed:', err);
    };
};

export const connectToAggregatedSource = (onData) => {
    const aggregatedEvtSource = new EventSource("http://localhost:8085/binance/trades/aggregated");

    aggregatedEvtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onData(data);
    };

    aggregatedEvtSource.onerror = (err) => {
        console.error('Aggregated EventSource failed:', err);
    };
};
