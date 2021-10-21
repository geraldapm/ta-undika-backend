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
        const respHeader = axios.get(`http://easeplantz.eu.org/wp-json/wp/v2/search?search=${webid}`)
        console.log(respHeader.title);
        const longUrl = respHeader.url;
        const newStation = {
            uuid, webid, id, longUrl, shortUrl,
        };
        this._station.push(newStation);

        const isSuccess = this._station.filter((note) => note.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return id;
    }

    getStation() {
        return this._station;
    }

    getStationById(id) {
        const station = this._station.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Stasiun tidak ditemukan');
        }
        return station;
    }

    deleteStationById(id) {
        const index = this._station.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Stasiun gagal dihapus. Id tidak ditemukan');
        }
        this._station.splice(index, 1);
    }
}

module.exports = ShortenerService;
