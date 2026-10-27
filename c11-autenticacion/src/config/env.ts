import env from 'env-var';

try {
    process.loadEnvFile();
} catch {
    // Si no existe .env, se usan los valores por defecto o las variables del sistema
}

export const variables = {
    entorno: {
        nodeEnv: env.get('NODE_ENV').default('development').asString(),
        esProduccion: env.get('NODE_ENV').default('development').asString() === 'production',
        debug: env.get('DEBUG').default('false').asBool(),
    },

    servidor: {
        puerto: env.get('PORT').default(3000).asIntPositive(),
    },

    database: {
        MONGO_URL: env.get('MONGO_URL').required().asString(),
        MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
        MONGO_PASSWORD: env.get('MONGO_PASSWORD').asString(),
        MONGO_PORT: env.get('MONGO_PORT').asPortNumber(),
        MONGO_USER: env.get('MONGO_USER').asString(),
    }
};
