import { connectToRawSource, connectToAggregatedSource } from './api.js';
import { updateAggregatedChart } from './aggregatedChart.js';

const initApp = () => {
    console.log('Initializing application...');

    connectToRawSource((rawData));

    connectToAggregatedSource((aggregatedData) => {
        updateAggregatedChart(aggregatedData);
    });
};

initApp();
