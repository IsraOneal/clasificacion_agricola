const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define(
    'products', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = Product;
