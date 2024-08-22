import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Rol = sequelize.define('rol', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
});

// Las asociaciones se definen después de importar todos los modelos
Rol.associate = models => {
    Rol.hasMany(models.Usuario, {
        foreignKey: 'rol',
        as: 'usuarios'
    });
};

export default Rol;
