/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const ClientError = require('../../exceptions/ClientError');
/** shortener service
     */
class SensorHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.getSensorHandler = this.getSensorHandler.bind(this);
        this.getSensorsHandler = this.getSensorsHandler.bind(this);
        this.addSensorHandler = this.addSensorHandler.bind(this);
        this.deleteSensorHandler = this.deleteSensorHandler.bind(this);
    }
    /*
     * function handler
     * @param  {object} error
     */
    handleClientError(error, res) {
        if (error instanceof ClientError) {
            return res.status(error.statusCode).json({
                status: 'fail',
                message: error.message,
            });
        }

        if (error instanceof NotFoundError) {
            return res.status(error.statusCode).json({
                status: 'fail',
                message: error.message,
            });
        }

        // Server ERROR!
        return res.status(500).json({
            status: 'failed',
            message: 'internal server execption',
        });
    }
    /**
     * @param  {object} req
     * @param  {object} res
     */
    async getSensorsHandler(req, res) {
        try {
            const sensors = await this._service.getSensors();
            return res.status(200).json({
                status: 'success',
                data: {
                    sensors,
                },
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e, res);
        }
    }

    async addSensorHandler(req, res) {
        try {
            this._validator.validateSensorPayload(req.body);
            const {uuid, sensors} = req.body;
            const {listSensor} = await this._service.addSensorByUUId({uuid, sensors});
            return res.status(200).json({
                status: 'success',
                message: 'sensor berhasil didaftarkan',
                data: {
                    listSensor,
                },
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e, res);
        }
    }

    async getSensorHandler(req, res) {
        try {
            const {uuid} = req.params;
            const sensor = await this._service.getSensorByUUId(uuid);
            return res.status(200).json({
                status: 'success',
                data: {
                    sensor,
                },
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e, res);
        }
    }

    async deleteSensorHandler(req, res) {
        try {
            const {uuid} = req.params;
            await this._service.deleteSensorByUUId(uuid);
            return res.status(200).json({
                message: 'sensor berhasil dihapus.',
                status: 'success',
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e, res);
        }
    }
}

module.exports = SensorHandler;
