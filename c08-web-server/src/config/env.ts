import env from 'env-var';

/*------------------------------------------------------------------------------------------------------
    CARGAR ARCHIVO .env  (nativo de Node, sin dotenv)
------------------------------------------------------------------------------------------------------*/

try {
    process.loadEnvFile();           // Carga el .env de la raíz del proyecto
} catch {
    // Si no existe .env, se usan los valores por defecto
}

/*------------------------------------------------------------------------------------------------------
    CONFIGURACIÓN DEL SERVIDOR
------------------------------------------------------------------------------------------------------*/

export const config = {
    servidor: {
        puerto: Number(process.env.PORT ?? 3000),
    },
};
