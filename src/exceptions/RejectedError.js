/* eslint-disable require-jsdoc */
const ClientError = require('./ClientError');

class RejectedError extends ClientError {
    constructor(message) {
        super(message, 403);
        this.name = 'RejectedError';
    }
}

module.exports = RejectedError;
