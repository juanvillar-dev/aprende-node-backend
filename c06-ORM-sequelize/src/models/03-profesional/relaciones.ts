import { Marca } from './Marca.js';
import { Producto } from './Producto.js';
import { Almacen } from './Almacen.js';

/*------------------------------------------------------------------------------------------------------
    RELACIONES (Marca → Producto → Almacen)

    Esto es runtime: registra en Sequelize las asociaciones y crea las columnas
    marcaId y productoId. Las declaraciones en las clases son solo TIPADO.
------------------------------------------------------------------------------------------------------*/

export function definirRelaciones(): void {
    Marca   .hasMany    (Producto   , { foreignKey: 'marcaId'   , as: 'productos'   });
    Producto.belongsTo  (Marca      , { foreignKey: 'marcaId'   , as: 'marca'       });

    Producto.hasMany    (Almacen    , { foreignKey: 'productoId', as: 'almacenes'   });
    Almacen .belongsTo  (Producto   , { foreignKey: 'productoId', as: 'producto'    });
}