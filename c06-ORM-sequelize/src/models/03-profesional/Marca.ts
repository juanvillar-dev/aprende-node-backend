import {
    DataTypes,
    Model,
    type CreationOptional,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute,
} from 'sequelize';
import { sequelize } from '../../db/connection.js';
import type { Producto } from './Producto.js';



export class Marca extends Model<InferAttributes<Marca>, InferCreationAttributes<Marca>> {
    declare id: CreationOptional<number>;
    
    declare nombre: string;

    declare productos?: NonAttribute<Producto[]>;
}



Marca.init(
    {
        id:     { 
            type: DataTypes.INTEGER.UNSIGNED, 
            autoIncrement: true, 
            primaryKey: true 
        },
        nombre: { 
            type: DataTypes.STRING(100), 
            allowNull: false, 
            unique: true 
        },
    },
    {
        sequelize,
        modelName: 'Marca',
        tableName: 'marcas',
        timestamps: true,
    },
);