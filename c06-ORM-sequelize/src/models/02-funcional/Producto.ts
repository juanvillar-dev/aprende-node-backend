import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

export class Producto extends Model {}

Producto.init(
    {
        id:          { 
            type: DataTypes.INTEGER.UNSIGNED, 
            autoIncrement: true, 
            primaryKey: true 
        },
        nombre:      { 
            type: DataTypes.STRING(200), 
            allowNull: false 
        },
        descripcion: { 
            type: DataTypes.TEXT, 
            allowNull: true 
        },
    },
    {
        sequelize,
        modelName: 'Producto',
        tableName: 'productos',
        timestamps: true,
    },
);