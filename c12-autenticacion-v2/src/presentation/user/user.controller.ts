import type { Request, Response } from "express";
import type { UserService } from "../service/user.service.js";
import { CustomError, UpdateUserDto } from "../../domain/index.js";

export class UserController {
    constructor (
        private userService: UserService
    ){}




    handlerError = (err: unknown, res: Response) =>{
        if(err instanceof CustomError){
            return res.status(err.statusCode).json({error: err.message});
        }
        console.log("Error del servidor", `${err}`);
        return res.status(500).json({error: "Error del servidor"})
    }




    findAllUsers = (req: Request, res: Response) => {
        this.userService.findAllUsers()
            .then((users) => res.json(users))
            .catch((error) => this.handlerError(error, res));
    }




    findUserById = (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        this.userService.findUserById(id as string)
            .then((user) => res.json(user))
            .catch((error) => this.handlerError(error, res));
    }




    updateUser = (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        const [err, dto] = UpdateUserDto.create(req.body);

        if(err) return res.status(400).json({error: err});

        this.userService.updateUser(id as string, dto!)
            .then((user) => res.json(user))
            .catch((error) => this.handlerError(error, res));
    }




    deleteUser = (req: Request, res: Response) => {
        const { id } = req.params;
        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        this.userService.deleteUser(id as string)
            .then((user) => res.json(user))
            .catch((error) => this.handlerError(error, res));
    }
}
