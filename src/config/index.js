const { NODE_ENV } = process.env;
const env = NODE_ENV ? NODE_ENV : 'staging';
console.info(`Running ${env} environment configuration`);
module.exports = require(`./${env}`);
