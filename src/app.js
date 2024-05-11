/* eslint-disable max-len */

const http = require('http');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');

const shortener = require('./controller/shortener/router');
const sensor = require('./controller/sensor/router');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

/* Add up routes */
app.use(sensor);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(shortener);

const porthttp = process.env.PORT || 5000;
const hostname = process.env.HOST || 'localhost';

const httpServer = http.createServer(app);

// Start service
httpServer.listen(porthttp, () => {
    console.log(`Server berjalan pada host ${hostname} dan port ${porthttp}`);
});
