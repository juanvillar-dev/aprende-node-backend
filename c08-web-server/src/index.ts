import { createServer } from './server.js';
import { config } from './config/env.js';
import { error } from 'node:console';


(async ()=>{
    main();
})()


async function main () {
        /*------------------------------------------------------------------------------------------------------
            PUNTO DE ENTRADA
            1) Se crea el servidor
            2) Se pone a ESCUCHAR en el puerto (hasta aquí no aceptaba conexiones)
            3) Al cerrar el proceso (Ctrl+C) se apaga con cuidado
        ------------------------------------------------------------------------------------------------------*/
        const server = createServer();


        server.listen(config.servidor.puerto, () => 
            console.log(`Servidor corriendo en http://localhost:${config.servidor.puerto}`)
        )


        server.on('error', (error) => {
            console.log('Error del servidor', error);
            process.exitCode = 1;
        })


        // Cierre ordenado: deja de aceptar conexiones y espera a que terminen las abiertas
        for (const signal of ['SIGINT', 'SIGTERM'] as const) {
            process.on(signal, () => {
                console.log(`\n${signal} recibido, cerrando servidor...`);
                server.close(() => process.exit(0));
            });
        }
}



