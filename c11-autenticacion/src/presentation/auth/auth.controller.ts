import { type Request, type Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto.js";
import { AuthService } from "../service/auth.service.js";
import { LoginUserDto } from "../../domain/index.js";

export class AuthController {

    private readonly authService = new AuthService();





    registrar = (req: Request, res: Response) => {
        const body = req.body;
        const [err, dto] = RegisterUserDto.create(body);

        if(err) return res.status(400).json({Error: err});

        this.authService.registrar(dto!)
            .then((data) => res.json(data))
            .catch((error) => res.status(error.statusCode).json({Error: error.message}));
    }





    login = (req: Request, res: Response) => {
        const [err, dto] = LoginUserDto.create(req.body);

        if(err) return res.status(400).json({Error: err});

        this.authService.login(dto!)
            .then(data => res.json(data))
            .catch((error) => res.status(error.statusCode).json({Error: error.message}));
    }



    validarEmail = (req: Request, res: Response) => {
        res.json("validarEmail");
    }
}