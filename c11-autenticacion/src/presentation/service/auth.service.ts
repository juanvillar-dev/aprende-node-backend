import { bycryptAdapter } from "../../config/bycript.adapter.js";
import { UserModel } from "../../data/index.js";
import type { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto.js";
import { CustomError, LoginUserDto, UserEntity } from "../../domain/index.js";

export class AuthService{
    constructor(){}


    public async registrar(dto: RegisterUserDto){
        // VERIFICAR SI EL USUARIO YA EXISTE
        const existeUsuario = await UserModel.findOne({email: dto.email});
        if(existeUsuario) 
            throw CustomError.badRequest("El email ya está registrado", "AuthService.registrar");


        // CREAR EL USUARIO
        const user = new UserModel({
            name: dto.name,
            email: dto.email,
            password: bycryptAdapter.hash(dto.password)
        });
        await user.save();


        // RETORNAR EL USUARIO SIN EL PASSWORD Y CON UN TOKEN
        const {password, ...userEntity} = UserEntity.fromModel(user);
        return {
            user: {...userEntity}, 
            token: 'ABC'
        };
    }








    public async login(dto: LoginUserDto){
        // VERIFICAR SI EL USUARIO EXISTE
        const user = await UserModel.findOne({email: dto.email});
        if(!user) 
            throw CustomError.badRequest("Datos incorrectos", "AuthService.login");


        // VERIFICAR SI EL PASSWORD ES CORRECTO
        if(!bycryptAdapter.compare(dto.password, user.password))
            throw CustomError.badRequest("Datos incorrectos", "AuthService.login");


        // RETORNAR EL USUARIO SIN EL PASSWORD Y CON UN TOKEN
        const {password, ...userEntity} = UserEntity.fromModel(user)
        
        return {
            user: {...userEntity},
            token: 'ABC'
        }

    }






    public async validarEmail(){

    }
}