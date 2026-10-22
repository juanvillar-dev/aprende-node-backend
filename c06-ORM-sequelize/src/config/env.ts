import env from 'env-var';

/*------------------------------------------------------------------------------------------------------
    CARGAR ARCHIVO .env  (nativo de Node, sin dotenv)
------------------------------------------------------------------------------------------------------*/

try {
    process.loadEnvFile();           // Carga el .env de la raíz del proyecto
} catch {
    // Si no existe .env, se usan los .default() de abajo o variables del sistema
}

/*------------------------------------------------------------------------------------------------------
    VARIABLES DE ENTORNO TIPADAS Y VALIDADAS
------------------------------------------------------------------------------------------------------*/

export const config = {
    entorno: {
        nodeEnv:      env.get('NODE_ENV').default('development').asString(),
        esProduccion: env.get('NODE_ENV').default('development').asString() === 'production',
        debug:        env.get('DEBUG').default('false').asBool(),
    },

    baseDeDatos: {
        host:     env.get('DB_HOST').default('localhost').asString(),
        puerto:   env.get('DB_PORT').default(3306).asIntPositive(),
        nombre:   env.get('DB_NAME').required().asString(),
        usuario:  env.get('DB_USER').required().asString(),
        password: env.get('DB_PASSWORD').required().asString(),
    },
};