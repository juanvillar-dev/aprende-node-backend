import type { NextFunction, Request, Response } from "express";

export const general = (req: Request, res: Response, next: NextFunction) => {
    console.log("Solicitud al servidor")
    
    console.log(req.originalUrl);
    console.log(req.method);
    console.log(req.body);

    next();
}