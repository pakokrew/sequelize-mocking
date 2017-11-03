/**
 * Get the current instance instance of the database and more
 *
 * @module node-sequelize-with-mocks/database/index
 * @exports Database
 */

'use strict';

// Imports
const Sequelize = require('sequelize');
const _DatabaseInstance = require('./_instance');

/**
 * Database methods
 */

let instance = null;
class Database {
    /**
     * @returns {Sequelize}
     */
    static getInstance() {
        if (!instance) {
            instance = new Sequelize('my-database', 'mysqlUserName', 'mysqlUserPassword', {
                'host': 'localhost',
                'dialect': 'mysql',
                'define': {
                    'engine': 'MYISAM',
                    'timestamps': false, // Don't create for each model the 'createdAt' and 'updatedAt' field
                    'paranoid': false // Truly deleted. Not add a 'deletedAt' field
                },
                'pool': {
                    'max': 5,
                    'min': 0,
                    'idle': 10000
                },
                'query': {
                    'raw': true
                }
            });
        }

        return instance;
    }
}

/**
 * @enum {string}
 */
Database.FIELD_TYPE_ENUM = {
    'INTEGER': Sequelize.INTEGER,
    'STRING': Sequelize.STRING,
    'TEXT': Sequelize.TEXT
};

module.exports = Database;
