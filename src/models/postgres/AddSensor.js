/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {Pool} = require('pg');
const format = require('pg-format');
const NotFoundError = require('../../exceptions/NotFoundError');
/* eslint-disable camelcase */

const mapDBToModel = ({
    id_sensor,
    type,
    value,
    value_unit,
    display_unit,
    minvalue,
    maxvalue,
    uuid_sensor,
}) => ({
    id_sensor,
    type,
    value,
    valueUnit: value_unit,
    displayUnit: display_unit,
    minValue: minvalue,
    maxValue: maxvalue,
});

class AddSensor {
    constructor() {
        this._pool = new Pool();
    }

    // TODO: Fix this methor R/W! (Foreign key error)
    async addSensorByUUId({uuid, sensors}) {
        const psensor = sensors.map((sensor) => {
            return [
                sensor.id_sensor,
                sensor.type,
                sensor.value,
                sensor.valueUnit,
                sensor.displayUnit,
                sensor.minValue,
                sensor.maxValue,
                uuid,
            ];
        });
        console.log(psensor);
        const query = format('INSERT INTO sensors (id_sensor, type, value, value_unit, display_unit, minvalue, maxvalue, uuid_sensor) VALUES %L RETURNING id_sensor', psensor);
        /* const query = {
            text: 'INSERT INTO sensors VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING url_id, short_url, long_url',
            values: [sensors.id_sensor, sensors.type, sensors.value,
                sensors.valueUnit, sensors.displayUnit, sensors.minValue, sensors.maxValue, uuid],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].url_id) {
            throw new InvariantError('Stasiun gagal registrasi');
        } */
        const result = await this._pool.query(query);
        if (!result.rows[0].id_sensor) {
            throw new InvariantError('Sensor gagal dimasukkan');
        }
        return result.rows[0].id_sensor;
    }

    async getSensors() {
        const result = await this._pool.query('SELECT * FROM sensors');
        return result.rows.map(mapDBToModel);
    }

    async getSensorByUUId(uuid) {
        const query = {
            text: 'SELECT * FROM sensors WHERE uuid = $1',
            values: [uuid],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Sensor tidak ditemukan');
        }
        return result.rows.map(mapDBToModel)[0];
    }

    async deleteSensorByUUId(uuid) {
        const query = {
            text: 'DELETE FROM sensors WHERE uuid = $1 RETURNING uuid',
            values: [uuid],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Sensor gagal dihapus. UUId tidak ditemukan');
        }
        return result.rows[0].uuid;
    }
}

module.exports = AddSensor;
