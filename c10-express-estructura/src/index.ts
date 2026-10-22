import { ServerApp } from './app.js';
import { config } from './config/env.js';
import { routes } from './routes/index.js';



(async()=>{
    await main();
})()



/*------------------------------------------------------------------------------------------------------
    INICIAR SERVIDOR
------------------------------------------------------------------------------------------------------*/
async function main () {
    const app = new ServerApp(routes, config.servidor.puerto);
    app.start();
}