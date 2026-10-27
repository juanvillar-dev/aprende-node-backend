import { Router } from "express";
import { AuthController } from "./auth.controller.js";

export class AuthRouter {
    getRouters () {
        const router = Router();

        const controller = new AuthController();

        router.post("/register", controller.registrar);
        router.post("/login", controller.login);
        router.post("/validar-email", controller.validarEmail);
        
        return router;
    } 
}