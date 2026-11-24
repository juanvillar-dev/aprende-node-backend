import { Router, type Request, type Response } from "express";
import { AuthController } from "./auth.controller.js";
import { UserMongoRepository } from "../../infrastructure.ts/repositories/mongo/user.mongo.repository.js";
import { AuthService } from "../service/auth.service.js";
import { EmailService } from "../../config/email.js";
import { variables } from "../../config/variables.js";
import { JwtAdapter } from "../../config/jwt.adapter.js";

export class AuthRouter {
    getRouter(){
        const router = Router();


        const userRepository = new UserMongoRepository();
        const emailService = new EmailService(
            variables.email.service!,
            variables.email.email!,
            variables.email.password!,
            true
        );
        const authService = new AuthService(
            userRepository,
            emailService,
            variables.servidor.URL!
        );
        const authController = new AuthController(authService);

    

        router.get("", (req: Request, res: Response) => {
            res.json({ message: "Ruta de autenticación" });
        });
        router.post("/login", authController.login);
        router.post("/register", authController.register);
        router.get("/validate-email/:token", authController.validateEmail);


        return router;
    }
}