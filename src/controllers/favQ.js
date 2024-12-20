const favQService = require('../services/favQ');
const FAV_Q_PAGE_SIZE = 25;

async function issueARequestToFavQApiAndAbortIfNeeded({ page, tag }, requestsAbortControllers, batchIndex) {
    const data = await favQService.requestFROMFavQAPI({ page, tag }, requestsAbortControllers[batchIndex]);
    if (data.quotes.length === 0 || data.last_page) {
        for (let i = batchIndex + 1; i < requestsAbortControllers.length; i++) {
            const abortController = requestsAbortControllers[i];
            abortController.abort();
        }
    }
    return data;
}

async function getRandomListOfQuotes(number, tag) {
    const quotes = [];
    const numberOfNeededBatches = Math.ceil(number / FAV_Q_PAGE_SIZE);

    const batchPromises = [];
    const requestsAbortControllers = [];

    let shouldCancel = false;
    const onAbortFunction = () => {
        shouldCancel = true;
    };

    for (let batch = 0; batch < numberOfNeededBatches; batch++) {
        if (shouldCancel) break;
        const abortController = new AbortController();
        abortController.onabort = onAbortFunction;
        requestsAbortControllers.push(abortController);
        batchPromises.push(issueARequestToFavQApiAndAbortIfNeeded({ tag, page: batch + 1 }, requestsAbortControllers, batch));
    }

    const batchResults = await Promise.allSettled(batchPromises);
    for (const result of batchResults) {
        if (result.status === 'fulfilled') quotes.push(...result.value?.quotes);
        else console.error(result.reason);
    }

    return quotes.length > number ? quotes.slice(0, number) : quotes;
}

module.exports = {
    getRandomListOfQuotes
}
