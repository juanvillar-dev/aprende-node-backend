import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/connection.js';

/*------------------------------------------------------------------------------------------------------
    FORMA 2 — FUNCIONAL  (class extends Model + init)

    El patrón que más se ve en proyectos reales:
      - Clase que hereda de Model
      - init() define las columnas
      - SIN genéricos → los campos quedan como "any" (Model<any, any>)
    Funciona perfecto; lo que pierdes es autocompletado y validación al compilar.

    NOTA: aquí tampoco se declara marcaId en init; la crea la asociación.
------------------------------------------------------------------------------------------------------*/

export class Marca extends Model {}

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