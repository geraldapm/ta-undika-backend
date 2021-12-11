/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const SensorHandler = require('./handler');
const SensorValidator = require('../../validator/sensor');
const SensorService = require('../../service/sensor-db/SensorService');
const sensor = new SensorHandler(new SensorService, SensorValidator);

// router.post('/sensor', sensor.addSensorHandler);
// router.put('/sensor', sensor.updateSensorHandler);
// router.get('/sensor/:uuid', sensor.getSensorHandler);
// router.get('/sensor', sensor.getSensorsHandler);
// router.delete('/sensor/:uuid', sensor.deleteSensorHandler);

router.route('/sensor').post(sensor.addSensorHandler, (res, req) => {
    /* #swagger.tags = ['Sensor Service']
     #swagger.description = 'Register sensor for each server' */

    /*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Registering for a new sensor.',
                schema: {
                    "$uuid": "88973355-ff01-42b9-a9ad-9d0ff2b3219d",
                    "$sensors": [
                        {
                            "$type": "DHT11",
                            "$value": 78,
                            "$valueUnit": "Humidity",
                            "$displayUnit": "%",
                            "$minValue": 0,
                            "$maxValue": 100
                        }
                    ]
                }
            } */

    /* #swagger.responses[200] = {
            schema: {
                "status": "success",
                "message": "sensor berhasil didaftarkan",
                "data": {
                    "sensors": [
                        {
                            "id_sensor": "SENWG8",
                            "type": "DHT11",
                            "value": 78,
                            "valueUnit": "Humidity",
                            "displayUnit": "%",
                            "minValue": 0,
                            "maxValue": 100
                        },
                    ]
                },
            },
            description: "Registered new sensor entry",
        } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak ditemukan"
        },
      description: "The station specified by UUID has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});

router.route('/sensor').put(sensor.updateSensorHandler, (res, req) => {
    /* #swagger.tags = ['Sensor Service']
     #swagger.description = 'Updated sensor value for each sensorId' */

    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Updated sensor values.',
                schema: {
    "$uuid": "88973355-ff01-42b9-59ad-9d0ff2b3219d",
    "$sensors": [
        {
            "$id_sensor": "SENWG8",
            "$value": 50
        },
    ]
}

}
        } */
    /* #swagger.respon

    /* #swagger.responses[200] = {
      schema: {
    "status": "success",
    "message": "sensor berhasil diperbarui",
    "data": {
        "sensors": [
            {
                "id_sensor": "SENWG8",
                "type": "DHT11",
                "value": 78,
                "valueUnit": "Humidity",
                "displayUnit": "%",
                "minValue": 0,
                "maxValue": 100
            },
        ]
    }
}
      },
      description: "Updated sensor value" } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak ditemukan"
        },
      description: "The station specified by UUID has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});

router.route('/sensor/:uuid').get(sensor.getSensorHandler, (res, req) => {
    /* #swagger.tags = ['Sensor Service']
     #swagger.description = 'Get sensor entries for each station' */

    /* #swagger.parameters['uuid'] = {
            description: 'Bluetooth UUID',
            required: true,
            schema: 'ec2f07a3-2463-440b-af7a-2df34068c788'
    } */

    /* #swagger.responses[200] = {
            schema: {
    "status": "success",
    "data": {
        "sensor": [
            {
                "id_sensor": "SENWG8",
                "type": "DHT11",
                "value": "78.00",
                "valueUnit": "Humidity",
                "displayUnit": "%",
                "minValue": "0",
                "maxValue": "100"
            },
        ]
    }
},
            description: "Registered new sensor entry",
        } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak ditemukan"
        },
      description: "The station specified by UUID has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});

router.route('/sensor').get(sensor.getSensorsHandler, (res, req) => {
    /* #swagger.tags = ['Sensor Service']
     #swagger.description = 'Updated sensor value for each sensorId' */

    /* #swagger.responses[200] = {
      schema: {
    "status": "success",
    "data": {
        "sensors": [
            {
                "uuid": "88973355-ff01-42b9-cdef-9d0ff2b3219d",
                "sensors": [
                    {
                        "id_sensor": "SENWG8",
                        "type": "DHT11",
                        "value": 78,
                        "valueUnit": "Humidity",
                        "displayUnit": "%",
                        "minValue": "0",
                        "maxValue": "100"
                    },
                    {
                        "id_sensor": "SEN0yf",
                        "type": "LM35",
                        "value": 30.25,
                        "valueUnit": "Celcius",
                        "displayUnit": "C",
                        "minValue": "0",
                        "maxValue": "100"
                    }
                ]
            }
        ]
    }
},
      description: "Get all sensor entry" } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});

router.route('/sensor/:uuid').delete(sensor.deleteSensorHandler, (res, req) => {
    /* #swagger.tags = ['Registration Service']
    #swagger.description = 'Delete sensor values' */

    /* #swagger.parameters['uuid'] = {
            description: 'Bluetooth UUID',
            required: true,
            schema: 'ec2f07a3-2463-440b-af7a-2df34068c788'
    } */

    /* #swagger.responses[200] = {
        schema: { "status": "success",
        "message": "Sensor berhasil dihapus."
        }
    },
      description: "Deleted the station entry" } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak ditemukan"
        },
      description: "The station specified by UUID has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal Server error"
        },
      description: "Internal Server error" } */
});

module.exports = router;

