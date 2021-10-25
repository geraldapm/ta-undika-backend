/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const RegisterStation = require('../../models/postgres/RegisterStation');
const AddSensor = require('../../models/postgres/AddSensor');

class SensorService {
    constructor() {
        this._register = new RegisterStation;
        this._sensor = new AddSensor;
    }

    async addSensorByUUId({uuid, sensors}) {
        const station = await this._register.isStationExistUUId(uuid);
        if (station) {
            throw new InvariantError('Stasiun sudah terdaftar.');
        }

        sensors = sensors.map((sensor) => {
            const senid = nanoid(3);
            return {
                id_sensor: `SEN${senid}`,
                type: sensor.type,
                value: sensor.value,
                valueUnit: sensor.valueUnit,
                displayUnit: sensor.displayUnit,
                minValue: sensor.minValue,
                maxValue: sensor.maxValue,
            };
        });

        const resultId = await this._sensor.addSensorByUUId({uuid, sensors});

        if (!resultId) {
            throw new InvariantError('Stasiun gagal registrasi');
        }
        return sensors;
    }

    async getSensors() {
        const result = await this._sensor.getSensors();
        const stasensor = result.map((sensor) => {
            return {
                uuid: sensor.uuid,
                sensors: sensor.sensors,
            };
        });
        return stasensor;
    }

    async getSensorByUUId(uuid) {
        const sensor = await this._sensor.getSensorByUUId(uuid);
        if (!sensor) {
            throw new NotFoundError('Sensor tidak ditemukan');
        }
        return station;
    }

    async deleteSensorByUUId(uuid) {
        const result = await this._sensor.deleteSensorByUUId(uuid);
        if (!result) {
            throw new NotFoundError('Gagal menghapus sensor');
        }
    }
}

module.exports = SensorService;
