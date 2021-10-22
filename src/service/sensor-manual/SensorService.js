/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SensorService {
    constructor() {
        this._station = [];
    }
    // TODO: Create the service handler for SensorService!
    async addSensorByID({uuid, sensors}) {
        const id = nanoid(3);
        const newStation = {
            uuid, sensors, id, longUrl, shortUrl, meta,
        };
        this._station.push(newStation);

        const isSuccess = this._station.filter((station) => station.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return {id, shortUrl};
    }

    getSensorService() {
        return this._station;
    }

    getSensorById(uuid) {
        const station = this._station.filter((n) => n.id === uuid)[0];
        if (!station) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    deleteSensorById(uuid) {
        const index = this._station.findIndex((station) => station.id === uuid);
        if (index === -1) {
            throw new NotFoundError('Stasiun gagal dihapus. Id tidak ditemukan');
        }
        this._station.splice(index, 1);
    }
}

module.exports = SensorService;
