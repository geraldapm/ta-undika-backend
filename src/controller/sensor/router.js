/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const SensorHandler = require('./handler');
const SensorValidator = require('../../validator/sensor');
const SensorService = require('../../service/sensor-db/SensorService');
const sensor = new SensorHandler(new SensorService, SensorValidator);

router.post('/sensor', sensor.addSensorHandler);
router.put('/sensor', sensor.updateSensorHandler);
router.get('/sensor/:uuid', sensor.getSensorHandler);
router.get('/sensor', sensor.getSensorsHandler);
router.delete('/sensor/:uuid', sensor.deleteSensorHandler);

module.exports = router;

