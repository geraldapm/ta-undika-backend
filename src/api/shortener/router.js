/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const ShortenerHandler = require('./handler');
const ShortenerService = require('../../service/short-db/ShortenerService');
const ShortenerValidator = require('../../validator/shortener');

const shortenerService = new ShortenerService;

const shortenerHandler = new ShortenerHandler(shortenerService,
    ShortenerValidator);
router.get('/station/:uuid', shortenerHandler.getStationDetailsHandler);
router.delete('/:uuid', shortenerHandler.deleteIndexHandler);
router.get('/api/:urlId', shortenerHandler.getIndexDetailsHandler);
router.get('/:urlId', shortenerHandler.redirectIndexHandler);
router.get('/', shortenerHandler.getIndexHandler);
router.post('/', shortenerHandler.postIndexHandler);


module.exports = router;
