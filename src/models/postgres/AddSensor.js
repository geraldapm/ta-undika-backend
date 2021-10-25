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

        const result = await this._pool.query(query);
        if (!result.rows[0].id_sensor) {
            throw new InvariantError('Sensor gagal dimasukkan');
        }
        return result.rows[0].id_sensor;
    }

    // TODO: Fix the update sensor service
    async updateSensorByUUId({uuid, sensors}) {
        const psensor = sensors.map((sensor) => {
            return [
                sensor.id_sensor,
                sensor.value,
                uuid,
            ];
        });
        console.log(psensor);

        const query = format(`update sensors
    set value = bvalue::numeric
    from (values %L) v(id_psensor, bvalue, uuid)
    where id_sensor = id_psensor returning id_sensor`, psensor);

        const result = await this._pool.query(query);
        if (!result.rows[0].id_sensor) {
            throw new InvariantError('Sensor gagal dimasukkan');
        }
        return result.rows[0].id_sensor;
    }

    async getSensors() {
        const query = `SELECT  st.uuid, (SELECT json_agg(json_build_object('id_sensor', sen.id_sensor, 'type', sen.type, 'value', sen.value, 'valueUnit', sen.value_unit, 'displayUnit', sen.display_unit, 'minValue', sen.minvalue, 'maxValue', sen.maxvalue))
        FROM sensors sen WHERE st.uuid = sen.uuid_sensor) as sensors FROM stations st;`;
        const result = await this._pool.query(query);
        console.log(result.rows);
        return result.rows;
    }

    async getSensorByUUId(uuid) {
        const query = {
            text: 'SELECT * FROM sensors WHERE uuid_sensor = $1',
            values: [uuid],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Sensor tidak ditemukan');
        }
        return result.rows.map(mapDBToModel);
    }

    async deleteSensorByUUId(uuid_sensor) {
        const query = {
            text: 'DELETE FROM sensors WHERE uuid_sensor = $1 RETURNING uuid_sensor',
            values: [uuid_sensor],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Sensor gagal dihapus. UUId tidak ditemukan');
        }
        return result.rows[0].uuid_sensor;
    }
}

module.exports = AddSensor;
