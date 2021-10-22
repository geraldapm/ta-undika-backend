/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const SensorHandler = require('./handler');
const SensorValidator = require('../../validator/sensor');
const SensorService = require('../../service/sensor-manual/SensorService');
const sensor = new SensorHandler(new SensorService, SensorValidator);

router.get('/', sensor.getSensorHandler);
router.post('/', sensor.addSensorHandler);
router.put('/', sensor.updateSensorHandler);
router.delete('/', sensor.deleteSensorHandler);

module.exports = router;
