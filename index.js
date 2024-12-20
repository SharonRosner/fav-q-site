const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const compression = require('compression');
const Ddos = require('ddos');
const ddos = new Ddos({ burst: 200, limit: 600 });

const favQ = require('./src/routes/favQ');

const app = express();
const port = process.env.PORT || 4000;

app.set('port', port);
app.use(compression());
app.use(cors());
app.use(parser.json({ extended: true }));
app.use(ddos.express);


app.use('/', express.static('./fe/build'));

app.use('/api/favQ', favQ);

app.get('/api/health', async (req, res) => {
    res.json({ status: 'healthy' });
});

app.all('/api/*', (req, res) => {
    res.status(404).json({ result: 'Failure', error: 'Bad Route' });
});

app.listen(port, () => {
    console.info(`listening on port ${port}`);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection:', p, 'reason:', reason);
});

