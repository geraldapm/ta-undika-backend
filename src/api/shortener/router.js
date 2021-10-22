/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const ShortenerHandler = require('./handler');
const ShortenerService = require('../../service/short-manual/ShortenerService');
const ShortenerValidator = require('../../validator/shortener');

const short = new ShortenerHandler(new ShortenerService, ShortenerValidator);
router.get('/station/:uuid', short.getStationDetailsHandler);
router.delete('/:uuid', short.deleteIndexHandler);
router.get('/api/:urlId', short.getIndexDetailsHandler);
router.get('/:urlId', short.redirectIndexHandler);
router.get('/', short.getIndexHandler);
router.post('/', short.postIndexHandler);


module.exports = router;
