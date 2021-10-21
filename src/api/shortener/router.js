/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const ShortenerService = require('./handler');
short = new ShortenerService;

router.get('/', short.getIndexHandler);
router.get('/:urlId', short.redirectIndexHandler);
router.post('/', short.postIndexHandler);
router.delete('/', short.deleteIndexHandler);

module.exports = router;
