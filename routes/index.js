/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const {getIndexHandler, postIndexHandler,
    deleteIndexHandler} = require('../handler/index');

router.get('/', getIndexHandler);
router.get('/', postIndexHandler);
router.get('/', deleteIndexHandler);

module.exports = router;
