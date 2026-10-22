import { Sequelize } from 'sequelize';
import { config } from '../config/env.js';

/*------------------------------------------------------------------------------------------------------
    INSTANCIA DE SEQUELIZE
    Recibe: database, user, password y opciones de conexión.
    El dialect 'mysql' usa el driver mysql2, instalado como dependencia.
------------------------------------------------------------------------------------------------------*/

export const sequelize = new Sequelize(
    config.baseDeDatos.nombre,
    config.baseDeDatos.usuario,
    config.baseDeDatos.password,
    {
        host:    config.baseDeDatos.host,
        port:    config.baseDeDatos.puerto,
        dialect: 'mysql',

        // En modo debug, Sequelize imprime el SQL que ejecuta (útil para aprender)
        logging: config.entorno.debug ? console.log : false,
    },
);