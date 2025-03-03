require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false 
    }
);


sequelize.authenticate()
    .then(() => console.log('Conectado a la base de datos correctamente'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

module.exports = sequelize;
