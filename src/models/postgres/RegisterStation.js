/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {Pool} = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
/* eslint-disable camelcase */
const mapDBToModel = ({
    uuid,
    web_id,
    short_url,
    long_url,
    url_id,
}) => ({
    uuid,
    webid: web_id,
    urlId: url_id,
    shortUrl: short_url,
    longUrl: long_url,
});

class RegisterStation {
    constructor() {
        this._pool = new Pool();
    }

    async addStation(newStation) {
        const query = {
            text: 'INSERT INTO stations VALUES($1, $2, $3, $4, $5) RETURNING url_id, short_url, long_url',
            values: [newStation.uuid, newStation.webid, newStation.shortUrl,
                newStation.longUrl, newStation.urlId],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].url_id) {
            throw new InvariantError('Stasiun gagal registrasi');
        }

        return result.rows[0].url_id;
    }

    async getStations() {
        const result = await this._pool.query('SELECT * FROM stations');
        return result.rows.map(mapDBToModel);
    }

    async getStationById(url_id) {
        const query = {
            text: 'SELECT * FROM stations WHERE url_id = $1',
            values: [url_id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return result.rows.map(mapDBToModel)[0];
    }

    async getStationByUUId(uuid) {
        const query = {
            text: 'SELECT * FROM stations WHERE uuid = $1',
            values: [uuid],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return result.rows.map(mapDBToModel)[0];
    }

    async isStationExistUUId(uuid) {
        const query = {
            text: 'SELECT * FROM stations WHERE uuid = $1',
            values: [uuid],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            return false;
        }
        return true;
    }

    async deleteStationByUUId(uuid) {
        const query = {
            text: 'DELETE FROM stations WHERE uuid = $1 RETURNING uuid',
            values: [uuid],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Stasiun gagal unregister. UUId tidak ditemukan');
        }
        return result.rows[0].uuid;
    }
}

module.exports = RegisterStation;
