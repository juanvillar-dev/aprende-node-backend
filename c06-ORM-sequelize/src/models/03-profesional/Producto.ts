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
import type { Marca } from './Marca.js';
import type { Almacen } from './Almacen.js';



export class Producto extends Model<InferAttributes<Producto>, InferCreationAttributes<Producto>> {
    declare id          : CreationOptional<number>; // Opcional al crear en la base de datos (autoIncrement)

    // Columna creada por la asociación belongsTo (ver relaciones.ts)
    declare marcaId     : ForeignKey<Marca['id']>;  

    declare nombre      : string;               
    declare descripcion : string | null;

    declare marca?      : NonAttribute<Marca>;
    declare almacenes?  : NonAttribute<Almacen[]>;
}



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