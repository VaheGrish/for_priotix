const database = require('./dist/configs/database').default;

module.exports = {
    development: database,
    production: database
};
