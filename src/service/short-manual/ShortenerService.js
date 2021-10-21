/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-underscore-dangle */
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ShortenerService {
    constructor() {
        this._notes = [];
    }

    registerStation({uuid, webid}) {
        const id = nanoid(3);
        // TODO: Add the query into wordpress service to get long URL
        // TODO: Map long URL to short URL
        // TODO: Save the short URL using db.

        const newNote = {
            uuid, webid, id, longUrl, shortUrl,
        };
        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
        return id;
    }

    getNotes() {
        return this._notes;
    }

    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return note;
    }

    editNoteById(id, {title, body, tags}) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
        const updatedAt = new Date().toISOString();
        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._notes.splice(index, 1);
    }
}

module.exports = ShortenerService;
