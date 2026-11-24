import { CustomError } from "../errors/custom.error.js";

export class UserEntity{
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean = false,
        public password: string,
        public role: string[],
        public img?: string,
    ){}


    static fromModel(object: any): UserEntity{
        const {id, _id, name, email, emailValidated, password, role, img} = object;

        if(!id && !_id) 
            throw CustomError.internalServer("El usuario no tiene id", "UserEntity.fromModel");

        return new UserEntity(_id || id, name, email, emailValidated, password, role, img);
    }


    toJSON() {
        const { password, ...user } = this;
        return user;
    }
}