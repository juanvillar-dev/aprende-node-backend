import { CustomError } from "../errors/Custom.error.js";

export class UserEntity{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly isEmailValidated: boolean = false,
        public readonly password: string,
        public readonly role: string[],
        public readonly img?: string,
    ){}


    static fromModel(object: any): UserEntity{
        const {id, _id, name, email, emailValidated, password, role, img} = object;

        if (!_id && !id) 
            throw CustomError.badRequest("Falta el id", "UserEntity.fromModel");

        if( !name)
            throw CustomError.badRequest("Falta el name", "UserEntity.fromModel");

        if( !email)
            throw CustomError.badRequest("Falta el email", "UserEntity.fromModel");

        if( emailValidated === undefined)
            throw CustomError.badRequest("Falta el emailValidated", "UserEntity.fromModel");

        if( !password)
            throw CustomError.badRequest("Falta el password", "UserEntity.fromModel");

        if( !role)
            throw CustomError.badRequest("Falta el role", "UserEntity.fromModel");

        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    }
}