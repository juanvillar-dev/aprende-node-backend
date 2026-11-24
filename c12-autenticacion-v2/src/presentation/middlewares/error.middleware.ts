import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/index.js";


/*------------------------------------------------------------------------------------------------------
    MIDDLEWARE | RUTA NO ENCONTRADA
------------------------------------------------------------------------------------------------------*/
export const notFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    });
}




/*------------------------------------------------------------------------------------------------------
    MIDDLEWARE | MANEJO DE ERRORES
    Debe ser el último middleware registrado (Express lo detecta por tener 4 parámetros).
------------------------------------------------------------------------------------------------------*/
export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);

    if (err instanceof CustomError) {
        console.error(`Error controlado en ${req.method} ${req.originalUrl}: ${err.message}`);

        return res.status(err.statusCode).json({error: err.message});
    }

    console.error(`Error en ${req.method} ${req.originalUrl}:`, err);

    res.status(500).json({ 
        error: 'Error interno del servidor' 
    });
}
