import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/connection.js';

/*------------------------------------------------------------------------------------------------------
    FORMA 1 — SUPER BÁSICA  (sequelize.define)

    La forma más primitiva: define() crea el modelo SIN clases y SIN tipado.
      - Todo es "any": no hay autocompletado ni validación de campos en compilación.
      - Ideal para entender qué es un "modelo" o para prototipos rápidos.
      - define() crea solo el id (PK) y los timestamps createdAt/updatedAt.
      - Las columnas marcaId / productoId NO van aquí: las crean las asociaciones.
------------------------------------------------------------------------------------------------------*/

export const Marca = sequelize.define('Marca', {
    id:         { type: DataTypes.INTEGER.UNSIGNED  , autoIncrement: true   , primaryKey: true  },
    nombre:     { type: DataTypes.STRING(100)       , allowNull: false      , unique: true      },
}, { tableName: 'marcas' });



export const Producto = sequelize.define('Producto', {
    id:          { type: DataTypes.INTEGER.UNSIGNED , autoIncrement: true   , primaryKey: true  },
    nombre:      { type: DataTypes.STRING(200)      , allowNull: false  },
    descripcion: { type: DataTypes.TEXT             , allowNull: true   },
}, { tableName: 'productos' });



export const Almacen = sequelize.define('Almacen', {
    id:         { type: DataTypes.INTEGER.UNSIGNED  , autoIncrement: true   , primaryKey: true  },
    stock:      { type: DataTypes.INTEGER.UNSIGNED  , allowNull: false      , defaultValue: 0   },
    precio:     { type: DataTypes.DECIMAL(10, 2)    , allowNull: false  },
}, { tableName: 'almacen' });




/*------------------------------------------------------------------------------------------------------
    RELACIONES  (las FKs marcaId y productoId se crean aquí, automáticamente)
------------------------------------------------------------------------------------------------------*/
Marca   .hasMany    (Producto   , { foreignKey: 'marcaId'   , as: 'productos'   });
Producto.belongsTo  (Marca      , { foreignKey: 'marcaId'   , as: 'marca'       });

Producto.hasMany    (Almacen    , { foreignKey: 'productoId', as: 'almacenes'   });
Almacen .belongsTo  (Producto   , { foreignKey: 'productoId', as: 'producto'    });