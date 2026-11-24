import express, { Router } from 'express';
import { logMiddleware } from '../middlewares/log.middleware.js';
import { errorHandlerMiddleware, notFoundMiddleware } from '../middlewares/error.middleware.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

export class AppServer {
    private app = express();


    constructor(
        private port: number,
        private router: Router
    ){}


    async start(){
        /*------------------------------------------------------------------------------------------------------
            MIDDLEWARES GLOBALES
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(express.json());
        this.app.use(logMiddleware);
        this.app.use(express.urlencoded({extended: true}))


        /*------------------------------------------------------------------------------------------------------
            RUTAS
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(this.router);



        /*------------------------------------------------------------------------------------------------------
            MIDDLEWARES FINALES (404 y errores)
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(notFoundMiddleware);
        this.app.use(errorHandlerMiddleware);



        /*------------------------------------------------------------------------------------------------------
            INICIAR SERVIDOR
        ------------------------------------------------------------------------------------------------------*/
        this.app.listen(this.port,()=>{
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        })
    }
}