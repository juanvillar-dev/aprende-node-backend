import {
    DataTypes,
    Model,
    type CreationOptional,
    type ForeignKey,
    type InferAttributes,
    type InferCreationAttributes,
    type NonAttribute,
} from 'sequelize';
import { sequelize } from '../../db/connection.js';
import type { Producto } from './Producto.js';



/*------------------------------------------------------------------------------------------------------
    FORMA 3 — PROFESIONAL  (tipado estricto total)

    InferAttributes / InferCreationAttributes extraen los tipos de la propia clase,
    CreationOptional marca lo opcional al crear, NonAttribute marca lo que NO es columna.
    La relación solo es tipado: en runtime la registra relaciones.ts.
------------------------------------------------------------------------------------------------------*/

export class Almacen extends Model<InferAttributes<Almacen>, InferCreationAttributes<Almacen>> {
    declare id: CreationOptional<number>;

    // Columna creada por la asociación belongsTo (ver relaciones.ts)
    declare productoId: ForeignKey<Producto['id']>;

    // defaultValue en init → opcional al crear
    declare stock: CreationOptional<number>;

    // Nota: MySQL devuelve DECIMAL como string; aquí se tipa number (normaliza en producción)
    declare precio: number;

    // Asociación belongsTo (ver relaciones.ts)
    declare producto?: NonAttribute<Producto>;
}



//UNSIGNED: solo positivos, no negativos
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