/* eslint-disable require-jsdoc */

const ClientError = require('../../exceptions/ClientError');
/** shortener service
     */
class SensorHandler {
    /** initializer
     */
    constructor() {
        this.getSensorHandler = this.getSensorHandler.bind(this);
        this.addSensorHandler = this.getSensorHandler.bind(this);
        this.updateSensorHandler = this.updateSensorHandler.bind(this);
        this.deleteSensorHandler = this.deleteSensorHandler.bind(this);
    }
    /*
     * function handler
     * @param  {object} error
     */
    handleClientError(error) {
        if (error instanceof ClientError) {
            return res.status(e.statusCode).json({
                status: 'fail',
                message: e.message,
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
    async getSensorHandler(req, res) {
        try {
            const {name = 'fulan', hobby = 'senyum'} = req.query;
            console.log(`Ini sensor punya ${name} dan hobi saya ${hobby}`);
            return res.status(200).json({
                status: 'success',
                message: `Ini sensor punya ${name} dan hobi saya ${hobby}`,
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e);
        }
    }

    async addSensorHandler(req, res) {
        try {
            const {name = 'fulan', hobby = 'senyum'} = req.query;
            console.log(`Nama saya ${name} dan hobi saya ${hobby}`);
            return res.status(200).json({
                status: 'success',
                message: `nama saya ${name} dan hobi saya ${hobby}`,
            });
        } catch (e) {
            console.log(e);
            this.handleClientError(e);
        }
    }

    async updateSensorHandler(req, res) {
        try {
            const {name = 'fulan', hobby = 'senyum'} = req.query;
            console.log(`Nama saya ${name} dan hobi saya ${hobby}`);
            return res.status(200).json({
                status: 'success',
                message: `nama saya ${name} dan hobi saya ${hobby}`,
            });
        } catch (e) {
            this.handleClientError(e);
        }
    }

    async deleteSensorHandler(req, res) {
        try {
            const {name = 'fulan', hobby = 'senyum'} = req.query;
            console.log(`Nama saya ${name} dan hobi saya ${hobby}`);
            return res.status(200).json({
                status: 'success',
                message: `nama saya ${name} dan hobi saya ${hobby}`,
            });
        } catch (e) {
            this.handleClientError(e);
        }
    }
}

module.exports = SensorHandler;
