const Sequelize = require('sequelize');
const db = new Sequelize(
    'ecommerce',
    'root',
    'Diosesamor17.',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
    }
);

module.exports = db;