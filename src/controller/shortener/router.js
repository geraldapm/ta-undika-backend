/* eslint-disable max-len */
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
// router.get('/station/:uuid', shortenerHandler.getStationDetailsHandler);
// router.delete('/:uuid', shortenerHandler.deleteIndexHandler);
// router.get('/api/:urlId', shortenerHandler.getIndexDetailsHandler);
// router.get('/:urlId', shortenerHandler.redirectIndexHandler);
// router.get('/', shortenerHandler.getIndexHandler);
// router.post('/', shortenerHandler.postIndexHandler);

router.route('/station/:uuid').get(shortenerHandler.getStationDetailsHandler,
    (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Get specific station information based on UUID' */

        /* #swagger.parameters['uuid'] = {
            description: 'Bluetooth UUID',
            required: true,
            schema: 'ec2f07a3-2463-440b-af7a-2df34068c788'
    } */

        /* #swagger.responses[200] = {
      schema: {
          "status": "success",
  "data": {
    "uuid": "ec2f07a3-2463-440b-af7a-2df34068c788",
    "webid": "tentang",
    "urlId": "BqX",
    "shortUrl": "https://breoteshr.ml/BqX",
    "longUrl": "https://madejombang.id/tentang/",
    "sensors": [
      {
        "id_sensor": "SEN187",
        "type": "Smoke Sensor",
        "value": 50,
        "valueUnit": "Smokiness",
        "displayUnit": "%",
        "minValue": "0",
        "maxValue": "100"
      }
    ]
  }
      },
      description: "Found the station entry" } */

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

router.route('/:uuid').delete(shortenerHandler.deleteIndexHandler, (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Delete (unregister) station information based on UUID' */

    /* #swagger.parameters['uuid'] = {
            description: 'Bluetooth UUID',
            required: true,
            schema: 'ec2f07a3-2463-440b-af7a-2df34068c788'
    } */

    /* #swagger.responses[200] = {
        schema: { "status": "success",
        "message": "Stasiun berhasil unregister."
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
router.route('/api/:urlId').get(shortenerHandler.getIndexDetailsHandler, (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Get specific station information based on URL id' */

    /* #swagger.parameters['urlId'] = {
            description: 'API URL id',
            required: true,
            schema: 'BqX'
    } */

    /* #swagger.responses[200] = {
      schema: {
          "status": "success",
  "data": {
    "uuid": "ec2f07a3-2463-440b-af7a-2df34068c788",
    "webid": "tentang",
    "urlId": "BqX",
    "shortUrl": "https://breoteshr.ml/BqX",
    "longUrl": "https://madejombang.id/tentang/",
    "sensors": [
      {
        "id_sensor": "SEN187",
        "type": "Smoke Sensor",
        "value": 50,
        "valueUnit": "Smokiness",
        "displayUnit": "%",
        "minValue": "0",
        "maxValue": "100"
      }
    ]
  }
      },
      description: "Found the station entry" } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak ditemukan"
        },
      description: "The station specified by URL id has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});
router.route('/:urlId').get(shortenerHandler.redirectIndexHandler, (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Redirects short URL into Long URL' */

    /*
            #swagger.produces = ['text/html']
            #swagger.consumes = ['application/json', 'application/x-www-form-urlencoded'
            ,'text/html' ,'application/pdf' ,'image/png']

    */

    /* #swagger.parameters['urlId'] = {
            description: 'API URL id',
            required: true,
            schema: 'BqX'
    } */

    /* #swagger.responses[302] = {
      schema: 'https://madejombang.id/tentang'
  }
      },
      description: "Found the station entry" } */

    /* #swagger.responses[404] = {
      schema: {
        "status": "fail",
        "message": "URL ID tidak ditemukan"
        },
      description: "The URL id specified has not found." } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});
router.route('/').get(shortenerHandler.getIndexHandler, (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Get all stations registered in the server' */

    /* #swagger.responses[200] = {
        schema: {"status":"success","data":{"stations":[{"uuid":"88973355-ff01-42b9-abcd-9d0ff2b3219d","webid":"sendang made","urlId":"-u5","shortUrl":"https://breoteshr.ml/-u5","longUrl":"https://madejombang.id/sendang-made/","sensors":[{"id_sensor":"SENsWN","type":"LDR","value":3415,"valueUnit":"Analog","displayUnit":"-","minValue":"0","maxValue":"4095"},{"id_sensor":"SENPe9","type":"LDR","value":3421,"valueUnit":"Analog","displayUnit":"-","minValue":"0","maxValue":"4095"}]},{"uuid":"88973355-ff01-42b9-cdef-9d0ff2b3219d","webid":"tentang","urlId":"5Zl","shortUrl":"https://breoteshr.ml/5Zl","longUrl":"https://madejombang.id/tentang/","sensors":null}]}}
    },
      description: "Found the station entries" } */
});
router.route('/').post(shortenerHandler.postIndexHandler, (req, res) => {
    /* #swagger.tags = ['Registration Service']
        #swagger.description = 'Get specific station information based on URL id' */

    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Registering for a new station.',
                schema: {
                    "$uuid": "88973355-ff01-42b9-cdef-9d0ff2b3219d",
                    "$webid": "sendang made"
                }
        } */
    /* #swagger.responses[200] = {
     schema: {
          "status": "success",
  "data": {
    "uuid": "ec2f07a3-2463-440b-af7a-2df34068c788",
    "webid": "tentang",
    "urlId": "BqX",
    "shortUrl": "https://breoteshr.ml/BqX",
    "longUrl": "https://madejombang.id/tentang/",
    },
}
  }
      },
      description: "Found the station entry" } */

    /* #swagger.responses[400] = {
      schema: {
        "status": "fail",
        "message": "Stasiun tidak terdaftar!"
        },
      description: "Stasiun tidak terdaftar pada station list di server" } */

    /* #swagger.responses[500] = {
      schema: {
        "status": "fail",
        "message": "Internal server error"
        },
      description: "Internal Server error" } */
});

module.exports = router;
