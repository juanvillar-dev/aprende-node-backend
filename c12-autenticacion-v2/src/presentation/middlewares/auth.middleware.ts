import type { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserEntity } from "../../domain/index.js";
import { UserMongoRepository } from "../../infrastructure.ts/index.js";

export class AuthMiddleware {

    constructor(
    ){}


    // VALIDAR TOKEN Y ENVIAR EL USUARIO ASIGNADO EN CADA REQUEST
    static async validateJwt(req: Request, res: Response, next: NextFunction){
        //  OBTENER AUTHORIZACION DEL HEADER
        const authorization = req.header('Authorization');

        if(!authorization) 
            return res.status(401).json({error: 'No hay token'});

        if(!authorization.startsWith('Bearer ')) 
            return res.status(401).json({error: 'El Bearer Token es invalido'});


        //  OBTENER EL TOKEN
        const token = authorization.split(' ').at(1) || '';


        try {
            //  OBTENER EL OBJETO EN EL TOKEN
            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload)
                return res.status(401).json({error: 'Token invalido'});

            //  BUSCAR AL USUARIO
            const userRepository = new UserMongoRepository();

            const user = await userRepository.findUserById(payload.id);
            
            if(!user)
                return res.status(401).json({error: 'Token invalida - usuario'});

            //  PONER EL USUARIO EN EL REQUEST (no en el body: GET no tiene body)
            req.user = UserEntity.fromModel(user);

            next();
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Internal server error"})
        }
    }
}