const env = process.env;

const CONFIG = {
  SEND_STACK_TO_CLIENT: true,
  FAV_Q_API_URL: env.FAV_Q_API_URL ? env.FAV_Q_API_URL : 'https://favqs.com/api',
  FAV_Q_API_KEY: env.FAV_Q_API_KEY ? env.FAV_Q_API_KEY : '',
};

module.exports = CONFIG;