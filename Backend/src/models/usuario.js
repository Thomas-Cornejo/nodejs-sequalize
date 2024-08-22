import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import Rol from './rol.js'; // Asegúrate de importar el modelo Rol

export const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    cedula: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    contraseña: {
        type: DataTypes.STRING,
    },
    rol: { // Esto debe coincidir con el nombre del campo de clave foránea
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Las asociaciones se definen después de importar todos los modelos
Usuario.associate = models => {
    Usuario.belongsTo(models.Rol, {
        foreignKey: 'rol',
        as: 'rol'
    });
};

export default Usuario;
