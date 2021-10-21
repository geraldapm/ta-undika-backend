/* eslint-disable max-len */

const http = require('http');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');

const shortener = require('./api/shortener/router');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

/* Add up routes */
app.use('/', shortener);

const porthttp = process.env.PORT || 5000;
const hostname = process.env.HOST || 'localhost';

const httpServer = http.createServer(app);

httpServer.listen(porthttp, () => {
    console.log(`Server berjalan pada host ${hostname} dan port ${porthttp}`);
});
