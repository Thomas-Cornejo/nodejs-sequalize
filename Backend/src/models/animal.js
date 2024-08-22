import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js';

export const Animal = sequelize.define('animals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    breed: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    history: {
        type: DataTypes.INTEGER,
    },
    diseases: {
        type: DataTypes.STRING,
    },
    imagen: {
        type: DataTypes.STRING,
    },
    id_imagen: {
        type: DataTypes.STRING,
    }
}); 
export default Animal;