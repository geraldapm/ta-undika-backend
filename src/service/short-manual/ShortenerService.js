/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const axios = require('axios');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const Station = require('../../models/InMemory/station');

class ShortenerService {
    constructor() {
        this._station = Station;
    }

    async registerStation({uuid, webid}) {
        const station = this._station.filter((n) => n.uuid === uuid)[0];
        if (station) {
            throw new InvariantError('Stasiun sudah terdaftar.');
        }
        const id = nanoid(3);
        // TODO: Add the query into wordpress service to get long URL
        // TODO: Map long URL to short URL
        // TODO: Save the short URL using db.
        let shortUrl = '';
        const respHeader = await axios.get(`http://${process.env.WEB_HOST}/wp-json/wp/v2/search?search=${webid}`);
        const longUrl = respHeader.data[0].url;

        // Enabled calling API with meta responses. Useful for URL link redirection with custom page.
        // const respHeaderMeta = await axios.get(respHeader.data[0]._links.self[0].href);
        // const meta = respHeaderMeta.data.meta;
        if (process.env.NODE_ENV === 'production') {
            shortUrl = `http://${process.env.HOST}/${id}`;
        } else {
            shortUrl = `http://localhost:${process.env.PORT}/${id}`;
        }

        const newStation = {
            uuid, webid, id, longUrl, shortUrl,
        };
        this._station.push(newStation);

        const isSuccess = this._station.filter((station) => station.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return {id, shortUrl, longUrl};
    }

    getStations() {
        return this._station;
    }

    getStationById(id) {
        const station = this._station.filter((n) => n.id === id)[0];
        if (!station) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    getStationByUUId(uuid) {
        const station = this._station.filter((n) => n.uuid === uuid)[0];
        if (!station) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    deleteStationByUUId(uuid) {
        const index = this._station.findIndex((station) => station.uuid === uuid);
        if (index === -1) {
            throw new NotFoundError('Stasiun gagal dihapus. UUID tidak ditemukan');
        }
        this._station.splice(index, 1);
    }
}

module.exports = ShortenerService;
