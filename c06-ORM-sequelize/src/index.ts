import { sequelize } from './db/connection.js';
import { definirRelaciones } from './models/03-profesional/relaciones.js';
import { Marca } from './models/03-profesional/Marca.js';
import { Producto } from './models/03-profesional/Producto.js';
import { Almacen } from './models/03-profesional/Almacen.js';

/*------------------------------------------------------------------------------------------------------
    DEMO CRUD — Marca → Producto → Almacen (stock + precio)

    La demo usa la carpeta 03-profesional (tipado estricto).
    Para comparar con las otras formas cambia las rutas de import a
      ./models/01-super-basico/modelos.js  o  ./models/02-funcional/...
    IMPORTANTE: importa SOLO UNA carpeta a la vez (comparten nombres de modelo/tabla).
------------------------------------------------------------------------------------------------------*/

// 1) Relaciones (debe ir antes de sync y de cualquier consulta)
definirRelaciones();

// 2) Conexión
await sequelize.authenticate();
console.log('Conectado a MySQL. Tablas: marcas, productos, almacen');

// 3) Crea las tablas si no existen. force:true las BORRA y recrea cada vez.
//    Solo sirve para desarrollo/demos. En producción se usan MIGRACIONES (c07).
await sequelize.sync({ force: true });
console.log('Tablas sincronizadas.\n');

try {
    /*--------------- CREATE ---------------*/

    const innovatech = await Marca.create({ nombre: 'Innovatech' });

    const teclado = await Producto.create({
        nombre:      'Teclado mecánico',
        descripcion: 'Switch rojo, layout ISO',
        marcaId:     innovatech.id,
    });
    const mouse = await Producto.create({
        nombre:      'Mouse inalámbrico',
        descripcion: 'Conexión 2.4 GHz',
        marcaId:     innovatech.id,
    });

    // No pasamos "stock": usa el defaultValue (0)
    const stockTeclado = await Almacen.create({ productoId: teclado.id, precio: 89.9 });
    const stockMouse   = await Almacen.create({ productoId: mouse.id, stock: 10, precio: 39.5 });

    console.log(`Marca creada: ${innovatech.nombre}`);
    console.log(`Productos creados: ${teclado.nombre}, ${mouse.nombre}`);

    /*--------------- READ con eager loading anidado (marca → producto → almacen) ---------------*/

    const marcaConTodo = await Marca.findByPk(innovatech.id, {
        include: [
            { model: Producto, as: 'productos', include: [{ model: Almacen, as: 'almacenes' }] },
        ],
    });

    console.log(`\nInventario de ${marcaConTodo?.nombre}:`);
    for (const producto of marcaConTodo?.productos ?? []) {
        for (const registro of producto.almacenes ?? []) {
            console.log(`  - ${producto.nombre}: ${registro.stock} uds x $${Number(registro.precio).toFixed(2)}`);
        }
    }

    /*--------------- UPDATE ---------------*/

    await stockTeclado.update({ stock: 30 });
    console.log(`\nStock de "${teclado.nombre}" actualizado a 30 unidades.`);

    /*--------------- DELETE ---------------*/

    await stockMouse.destroy();
    console.log(`Registro en almacén de "${mouse.nombre}" eliminado.`);

    /*--------------- RESUMEN ---------------*/

    const [marcas, productos, registros] = await Promise.all([
        Marca.count(),
        Producto.count(),
        Almacen.count(),
    ]);

    console.log(`\nResumen: ${marcas} marca, ${productos} productos, ${registros} registro(s) en almacén.`);
} catch (error) {
    console.error('Error en la demo:', error);
    process.exitCode = 1;
} finally {
    await sequelize.close();
}