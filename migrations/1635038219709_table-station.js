/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('stations', {
        uuid: {
            type: 'VARCHAR(64)',
            primaryKey: true,
        },
        web_id: {
            type: 'TEXT',
            notNull: true,
        },
        short_url: {
            type: 'TEXT',
            notNull: true,
        },
        long_url: {
            type: 'TEXT',
            notNull: true,
        },
        url_id: {
            type: 'VARCHAR(5)',
            notNull: true,
        },
    });
    pgm.createTable('sensors', {
        id_sensor: {
            type: 'VARCHAR(16)',
            primaryKey: true,
        },
        type: {
            type: 'TEXT',
            notNull: true,
        },
        value: {
            type: 'NUMERIC(8,2)',
            notNull: true,
        },
        value_unit: {
            type: 'TEXT',
        },
        display_unit: {
            type: 'TEXT',
        },
        minvalue: {
            type: 'TEXT',
        },
        maxvalue: {
            type: 'TEXT',
        },
        uuid_sensor: {
            type: 'VARCHAR(64)',
            references: 'stations("uuid")',
            onDelete: 'CASCADE',
            onUpdata: 'CASCADE',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('sensors');
    pgm.dropTable('stations');
};
