import type { NextFunction, Request, Response } from "express";


export const log = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Petición entrante: ${req.method} ${req.url}`);
    next();
}