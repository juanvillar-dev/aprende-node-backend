import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*------------------------------------------------------------------------------------------------------
    LÓGICA DE LA TABLA DE MULTIPLICAR
------------------------------------------------------------------------------------------------------*/

async function crearTabla(base: number, limite: number): Promise<string> {
    let tabla = `========  Tabla del ${base}  ========\n`;

    for (let i = 1; i <= limite; i++) {
        tabla += `${base} x ${i} = ${base * i}\n`;
    }

    tabla += '==================================';

    return tabla;
}

async function guardarEnArchivo(base: number, limite: number, dir: string): Promise<string> {
    const tabla    = await crearTabla(base, limite);
    const carpeta  = path.join(process.cwd(), dir);
    const nombre   = `tabla-${base}.txt`;

    await fs.mkdir(carpeta, { recursive: true });
    await fs.writeFile(path.join(carpeta, nombre), tabla, 'utf8');

    return path.join(dir, nombre);
}

/*------------------------------------------------------------------------------------------------------
    CONFIGURACIÓN DEL CLI CON YARGS
------------------------------------------------------------------------------------------------------*/

const cli = await yargs(hideBin(process.argv))
    .scriptName('tabla')
    .usage('Uso: $0 <comando> [opciones]')
    .command(
        'tabular <base>',
        'Genera la tabla de multiplicar de un número',
        (yargs) => yargs
            .positional('base', {
                type: 'number',
                describe: 'Número base de la tabla',
                demandOption: true,
            })
            .option('limite', {
                alias: 'l',
                type: 'number',
                describe: 'Hasta qué número multiplicar',
                default: 10,
            })
            .option('dir', {
                alias: 'd',
                type: 'string',
                describe: 'Carpeta donde guardar el archivo',
                default: 'salidas',
            })
            .option('mostrar', {
                alias: 'm',
                type: 'boolean',
                describe: 'Mostrar la tabla en consola',
                default: false,
            }),
        async (argv) => {
            const tabla = await crearTabla(argv.base, argv.limite);

            if (argv.mostrar) {
                console.log(tabla);
            }

            const ruta = await guardarEnArchivo(argv.base, argv.limite, argv.dir);
            console.log(`Tabla guardada en: '${ruta}'`);
        }
    )
    .command(
        'desarrollador',
        'Muestra info del desarrollador',
        () => {},
        () => {
            console.log('CLI creada con Node.js + TypeScript + Yargs');
        }
    )
    .example('$0 tabular 7 --limite 12 --mostrar', 'Genera la tabla del 7 hasta el 12 y la muestra')
    .demandCommand(1, 'Debes indicar un comando. Usa --help para ver las opciones.')
    .strict()
    .help()
    .version('1.0.0')
    .alias('h', 'help')
    .parse();

export { cli };