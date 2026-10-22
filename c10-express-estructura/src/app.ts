import express, { Router, type Express } from 'express';
import { notFound, errorHandler } from './middlewares/error.js';
import { general } from './middlewares/general.js';

/*------------------------------------------------------------------------------------------------------
    APP
    Configuración de la aplicación. No escucha: eso lo hace src/index.ts.
------------------------------------------------------------------------------------------------------*/

export class ServerApp {
    private app: Express;


    constructor(private routes: Router, private port: number){
        this.app = express();
    }


    public start(){
        /*------------------------------------------------------------------------------------------------------
            MIDDLEWARES GLOBALES
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(express.json());
        this.app.use(general);


        /*------------------------------------------------------------------------------------------------------
            RUTAS
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(this.routes);


        /*------------------------------------------------------------------------------------------------------
            MIDDLEWARES FINALES (404 y errores)
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(notFound);
        this.app.use(errorHandler);


        /*------------------------------------------------------------------------------------------------------
            INICIAR SERVIDOR
        ------------------------------------------------------------------------------------------------------*/
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}
