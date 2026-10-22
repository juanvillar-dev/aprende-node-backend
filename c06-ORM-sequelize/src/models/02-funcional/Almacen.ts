import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

export class Almacen extends Model {}

Almacen.init(
    {
        id:     { 
            type: DataTypes.INTEGER.UNSIGNED, 
            autoIncrement: true, 
            primaryKey: true 
        },
        stock:  { 
            type: DataTypes.INTEGER.UNSIGNED, 
            allowNull: false, 
            defaultValue: 0 
        },
        precio: { 
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false 
        },
    },
    {
        sequelize,
        modelName: 'Almacen',
        tableName: 'almacen',
        timestamps: true,
    },
);