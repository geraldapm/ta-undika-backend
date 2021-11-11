/* eslint-disable require-jsdoc */
const fs = require('fs');
const path = require('path');
const stationfile = path.join(__dirname, 'station.json');

class AuthStations {
    constructor() {
    }

    readFileUtil(filepath) {
        try {
            const jsonString = fs.readFileSync(filepath, 'utf8');
            const parsedjson = JSON.parse(jsonString);
            if (!parsedjson) {
                const obj = {};
                writeFileUtil(obj, filepath);
                // console.log('new JSON initialized');
            }
            console.log('read completed');
            // console.log(parsedjson);
            return parsedjson;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    readFile() {
        try {
            const parsedjson = this.readFileUtil(stationfile);
            return parsedjson;
        } catch (err) {
            console.log(err);
            return;
        }
    }
}

module.exports = AuthStations;
