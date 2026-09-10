import os from 'node:os';

console.log('=== Módulo nativo os ===');

export const datos : any = {
    SO: os.type(),
    Version: os.release(),
    Arquitectura: os.arch(),
    Plataforma: os.platform(),

    CPU: os.cpus().length,    

    Usuario: os.userInfo(),

    Tiempo_PRENDIDO: os.uptime(),

    Memoria: {
        Total: os.totalmem()/1024**2 + "Gb",
        Libre: os.freemem()/1024**2 + "Gb"
    },
    Directorio: {
        Home: os.homedir(),
        Temporal: os.tmpdir()
    },
    RED: {
        SIGINT: os.constants.signals.SIGINT,
        Interfaces: os.networkInterfaces()
    },
}

console.log(datos);