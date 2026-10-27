import express, { Router } from "express"
import { log } from "../middlewares/log.js";
import { errorHandler, notFound } from "../middlewares/error.js";

export class App {
    private readonly app = express();


    constructor(
        private port : number,
        private router : Router,
    ){}


    async start() {
        /*------------------------------------------------------------------------------------------------------
            MIDDLEWARES GLOBALES
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(express.json());
        this.app.use(log);



        /*------------------------------------------------------------------------------------------------------
            RUTAS
        ------------------------------------------------------------------------------------------------------*/
        this.app.use(this.router);



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