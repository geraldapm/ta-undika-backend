/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const axios = require('axios');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ShortenerService {
    constructor() {
        this._station = [];
    }

    async registerStation({uuid, webid}) {
        const id = nanoid(3);
        // TODO: Add the query into wordpress service to get long URL
        // TODO: Map long URL to short URL
        // TODO: Save the short URL using db.
        const respHeader = await axios.get(`http://${process.env.WEB_HOST}/wp-json/wp/v2/search?search=${webid}`);
        const longUrl = respHeader.data[0].url;
        const respHeaderMeta = await axios.get(respHeader.data[0]._links.self[0].href);
        console.log(respHeaderMeta.data.meta);
        const meta = respHeaderMeta.data.meta;
        const shortUrl = `http://${process.env.HOST}:${process.env.PORT}/${id}`;
        const newStation = {
            uuid, webid, id, longUrl, shortUrl, meta,
        };
        this._station.push(newStation);

        const isSuccess = this._station.filter((station) => station.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return {id, shortUrl};
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

    deleteStationById(id) {
        const index = this._station.findIndex((station) => station.id === id);
        if (index === -1) {
            throw new NotFoundError('Stasiun gagal dihapus. Id tidak ditemukan');
        }
        this._station.splice(index, 1);
    }
}

module.exports = ShortenerService;
