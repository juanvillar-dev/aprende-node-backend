/*------------------------------------------------------------------------------------------------------
    INFORMACIÓN GENERAL DEL PROCESO
------------------------------------------------------------------------------------------------------*/

function informacion(){
    console.log('=== Información del proceso ===');
    console.log('PID del proceso:      ', process.pid);
    console.log('PID del padre:        ', process.ppid);
    console.log('Plataforma:           ', process.platform);
    console.log('Arquitectura:         ', process.arch);
    console.log('Versión de Node:      ', process.version);
    console.log('Director de trabajo:  ', process.cwd());
    console.log('Tiempo de ejecución:  ', process.uptime(), 'seg');
}





/*------------------------------------------------------------------------------------------------------
    ARGUMENTOS DE LÍNEA DE COMANDOS  (process.argv)
------------------------------------------------------------------------------------------------------*/
// node e4-process.ts hola 42
// argv[0] -> ruta de node, argv[1] -> ruta del archivo, el resto son argumentos del usuario

function argumentos(){
    console.log('=== Argumentos de línea de comandos ===');
    console.log(process.argv);
}





/*------------------------------------------------------------------------------------------------------
    VARIABLES DE ENTORNO  (process.env)
------------------------------------------------------------------------------------------------------*/

function variablesEntorno(){
    console.log('=== Variables de entorno ===');
    console.log('USUARIO:', process.env.USERNAME);
    console.log('RUTA_SISTEMA:', process.env.Path ? process.env.Path.slice(0, 60) + '...' : process.env.PATH);
    console.log('Todas:', Object.keys(process.env).length, 'variables definidas');
}





/*------------------------------------------------------------------------------------------------------
    MEMORIA DEL PROCESO
------------------------------------------------------------------------------------------------------*/

function memoria(){
    console.log('=== Memoria usada por el proceso (MB) ===');

    const usado = process.memoryUsage();

    console.log('RSS:            ', (usado.rss / 1024 / 1024).toFixed(2));
    console.log('Montón (heap):  ', (usado.heapUsed / 1024 / 1024).toFixed(2));
    console.log('Reservado:      ', (usado.heapTotal / 1024 / 1024).toFixed(2));
    console.log('Externo:        ', (usado.external / 1024 / 1024).toFixed(2));
}





/*------------------------------------------------------------------------------------------------------
    EVENTOS DEL PROCESO
------------------------------------------------------------------------------------------------------*/

function eventos(){
    console.log('=== Eventos del proceso ===');

    process.on('exit', (code) => {
        console.log(`-> El proceso está saliendo con código ${code}`);
    });

    process.on('uncaughtException', (err) => {
        console.log('-> Error no capturado:', err.message);
    });

    setTimeout(() => {
        console.log('-> Lanzando error no capturado...');
        throw new Error('Error de prueba');
    }, 500);
}





/*------------------------------------------------------------------------------------------------------
    SIGUIENTE TICK  (process.nextTick)
------------------------------------------------------------------------------------------------------*/

function siguienteTick(){
    console.log('=== process.nextTick ===');

    console.log('1. Sincrónico');

    process.nextTick(() => {
        console.log('2. nextTick');
    });

    console.log('3. Sincrónico (el nextTick corre antes que el resto de async)');
}





/*------------------------------------------------------------------------------------------------------
    SALIR DEL PROCESO  (process.exit)
------------------------------------------------------------------------------------------------------*/

function salir(){
    console.log('=== process.exit ===');

    process.exitCode = 0;                       // Código de salida (0 = éxito, 1 = error)
    console.log('El proceso finalizará con código', process.exitCode);

    process.exit();                             // Termina el proceso inmediatamente
    console.log('Esto nunca se ejecuta');
}





/*------------------------------------------------------------------------------------------------------
    ARRANCAR AUTOMÁTICAMENTE LOS EJEMPLOS
------------------------------------------------------------------------------------------------------*/

informacion();
argumentos();
variablesEntorno();
memoria();

const ejemplo = process.argv[2];

if (ejemplo === 'eventos') {
    eventos();          // node e4-process.ts eventos
} else if (ejemplo === 'tick') {
    siguienteTick();    // node e4-process.ts tick
} else if (ejemplo === 'salir') {
    salir();            // node e4-process.ts salir
} else {
    console.log('\nEjemplos extra: node e4-process.ts [eventos | tick | salir]');
}