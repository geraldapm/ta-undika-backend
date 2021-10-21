/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const SensorService = require('./handler');
sensor = new SensorService;

router.get('/', sensor.getSensorService);
router.post('/', sensor.addSensorService);
router.put('/', sensor.updateSensorService);
router.delete('/', sensor.deleteSensorService);

module.exports = router;
