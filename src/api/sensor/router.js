/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const SensorHandler = require('./handler');
sensor = new SensorHandler;

router.get('/', sensor.getSensorHandler);
router.post('/', sensor.addSensorHandler);
router.put('/', sensor.updateSensorHandler);
router.delete('/', sensor.deleteSensorHandler);

module.exports = router;
