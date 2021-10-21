/* eslint-disable require-jsdoc */

const ClientError = require('../../exceptions/ClientError');
/** shortener service
     */
class SensorService {
    /** initializer
     */
    constructor() {
        this.getSensorService = this.getSensorService.bind(this);
        this.addSensorService = this.getSensorService.bind(this);
        this.updateSensorService = this.updateSensorService.bind(this);
        this.deleteSensorService = this.deleteSensorService.bind(this);
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
    async getSensorService(req, res) {
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

    async addSensorService(req, res) {
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

    async updateSensorService(req, res) {
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

    async deleteSensorService(req, res) {
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

module.exports = SensorService;
