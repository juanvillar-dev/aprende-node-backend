import type { Request, Response } from "express";
import type { AuthService } from "../service/auth.service.js";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain/index.js";

export class AuthController {
    constructor(
        private authService: AuthService
    ){}




    handlerError = (err: unknown, res: Response) =>{
        if(err instanceof CustomError){
            return res.status(err.statusCode).json({error: err.message});
        }
        console.log("Error del servidor", `${err}`);
        return res.status(500).json({error: "Error del servidor"})
    }



    
    register = (req: Request, res: Response) => {
        const body = req.body;
        const [err, dto] = RegisterUserDto.create(body);

        if(err) return res.status(400).json({Error: err});

        this.authService.registerUser(dto!)
            .then((data) => res.json(data))
            .catch((error) => this.handlerError(error, res));
    }




    validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: "Token no proporcionado" });

        this.authService.validateEmail(token as string)
            .then(() => res.json({message: "Email validado correctamente"}))
            .catch((error) => this.handlerError(error, res));
    }




    login = (req: Request, res: Response) => {
        const body = req.body;
        const [err, dto] = LoginUserDto.create(body);

        if(err) return res.status(400).json({Error: err});

        this.authService.loginUser(dto!)
            .then(data => res.json(data))
            .catch((error) => this.handlerError(error, res));
    }
}