/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const Station = require('../../models/InMemory/station');

class SensorService {
    constructor() {
        this._station = Station;
    }

    addSensorByUUId({uuid, sensors}) {
        const indexStation = this._station.findIndex((n) => n.uuid === uuid);
        if (!indexStation === -1) {
            throw new NotFoundError('Stasiun tidak terdaftar.');
        }
        this._station[indexStation] = {
            ...this._station[indexStation],
            sensors,
        };
        const listSensor = sensors;
        const isSuccess = this._station.filter((station) => station.sensors === sensors).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return {listSensor};
    }

    getSensors() {
        const stasensor = this._station.map((sensor) => {
            return {
                uuid: sensor.uuid,
                sensors: sensor.sensors,
            };
        });
        return stasensor;
    }

    getSensorByUUId(uuid) {
        const index = this._station.findIndex((station) => station.uuid === uuid);
        if (index === -1) {
            throw new NotFoundError('UUId statsiun tidak ditemukan');
        }
        if (!('sensors' in this._station[index])) {
            throw new NotFoundError('Data sensor tidak ditemukan');
        }
        return this._station[index].sensors;
    }

    deleteSensorByUUId(uuid) {
        const index = this._station.findIndex((station) => station.uuid === uuid);
        if (index === -1) {
            throw new NotFoundError('Sensor gagal dihapus. UUId tidak ditemukan');
        }
        if (!('sensors' in this._station[index])) {
            throw new NotFoundError('Sensor gagal dihapus. data tidak ditemukan');
        }
        delete this._station[index].sensors;
    }
}

module.exports = SensorService;
