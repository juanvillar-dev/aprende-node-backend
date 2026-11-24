export class RegisterUserDto{

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}



    static create(object: any): [string?, RegisterUserDto?]{

        const {name, email, password} = object;

        if(!name)                         return ["Falta nombre"];
        if(!email)                          return ["Falta email" ];
        if(!password)                       return ["Falta el password"];
        if(password.length < 6)             return ["El password es muy corto"];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}