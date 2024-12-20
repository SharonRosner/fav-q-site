const { FAV_Q_API_URL, FAV_Q_API_KEY } = require('../config');
const throttledQueue = require('throttled-queue');
const axios = require('axios');

/*
Access to the API is rate limited. Each session is allowed 30 requests in a 20 second interval.
https://favqs.com/api
*/
const throttle = throttledQueue(30, 20 * 1000);

function generateParams({ page, tag }) {
    const params = {};
    if (page) params.page = page;
    if (tag) {
        params.filter = encodeURIComponent(tag);
        params.type = 'tag';
    }

    return params
}

function normalizeNoResultsCase(result) {
    if (result?.data?.quotes?.length === 1 && result?.data?.quotes?.[0].id === 0) result.data.quotes = [];
}

async function requestFROMFavQAPI({ page, tag }, abortController) {
    try {
        return throttle(async () => {

            const headers = { Authorization: `Token token="${FAV_Q_API_KEY}"` };
            const requestConfig = { headers };

            const params = generateParams({ page, tag });
            if (Object.keys(params).length > 0) requestConfig.params = params;

            if (abortController) requestConfig.signal = abortController.signal;
            const result = await axios.get(`${FAV_Q_API_URL}/quotes`, requestConfig);

            normalizeNoResultsCase(result);
            return result?.data;


        });
    } catch (ex) {
        console.error(ex);
    }
}

module.exports = {
    requestFROMFavQAPI
};

