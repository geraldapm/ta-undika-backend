const {SensorPayloadSchema, UpdateSensorPayloadSchema} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const SensorValidator = {
    validateSensorPayload: (payload) => {
        const validationResult = SensorPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

    validateUpdateSensorPayload: (payload) => {
        const validationResult = UpdateSensorPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SensorValidator;
