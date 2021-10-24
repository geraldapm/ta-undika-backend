/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const axios = require('axios');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const RegisterStation = require('../../models/postgres/RegisterStation');

class ShortenerService {
    constructor() {
        this._register = new RegisterStation;
    }

    async registerStation({uuid, webid}) {
        const station = await this._register.isStationExistUUId(uuid);
        if (station) {
            throw new InvariantError('Stasiun sudah terdaftar.');
        }

        const urlId = nanoid(3);
        let shortUrl = '';
        const respHeader = await axios.get(`http://${process.env.WEB_HOST}/wp-json/wp/v2/search?search=${webid}`);
        const longUrl = respHeader.data[0].url;

        // Enabled calling API with meta responses. Useful for URL link redirection with custom page.
        // const respHeaderMeta = await axios.get(respHeader.data[0]._links.self[0].href);
        // const meta = respHeaderMeta.data.meta;
        if (process.env.NODE_ENV === 'production') {
            shortUrl = `https://${process.env.HOST}/${urlId}`;
        } else {
            shortUrl = `http://localhost:${process.env.PORT}/${urlId}`;
        }

        const newStation = {
            uuid, webid, urlId, longUrl, shortUrl,
        };
        const resultId = await this._register.addStation(newStation);

        if (!resultId) {
            throw new InvariantError('Stasiun gagal registrasi');
        }
        return {urlId, shortUrl, longUrl};
    }

    async getStations() {
        const stations = await this._register.getStations();
        return stations;
    }

    async getStationById(id) {
        const station = await this._register.getStationById(id);
        if (!station) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    async getStationByUUId(uuid) {
        const station = await this._register.getStationByUUId(uuid);
        if (!station) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    async deleteStationByUUId(uuid) {
        const result = await this._register.deleteStationByUUId(uuid);
        if (!result) {
            throw new NotFoundError('Gagal unregister stasiun');
        }
    }
}

module.exports = ShortenerService;
