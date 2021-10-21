/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const ShortenerHandler = require('./handler');
const ShortenerValidator = require('../../validator/shortener');
const ShortenerService = require('../../service/short-manual/ShortenerService');
short = new ShortenerHandler(new ShortenerService, ShortenerValidator);

router.get('/', short.getIndexHandler);
router.get('/:urlId', short.redirectIndexHandler);
router.post('/', short.postIndexHandler);
router.delete('/', short.deleteIndexHandler);

module.exports = router;
