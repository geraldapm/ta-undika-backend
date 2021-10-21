const Joi = require('joi');

const SensorPayloadSchema = Joi.object({
    uuid: Joi.string().required(),
    sensors: Joi.array().items(Joi.object({
        type: Joi.string(),
        value: Joi.number().double().required(),
        valueUnit: Joi.string().required(),
    })).required(),
});

module.exports = {SensorPayloadSchema};
