const Joi = require('joi');

const ShortenerPayloadSchema = Joi.object({
    uuid: Joi.string().required(),
    webid: Joi.string(),
});

module.exports = {ShortenerPayloadSchema};
