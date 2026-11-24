export class LoginUserDto{
    constructor(
        public email: string,
        public password: string,
    ){}


    static create(object: any): [string?, LoginUserDto?]{

        if(!object)                         return ["No hay datos" ];

        const {email, password} = object;

        if(!email)                          return ["Falta email" ];
        if(!password)                       return ["Falta el password"];
        if(password.length < 6)             return ["El password es muy corto"];

        return [undefined, new LoginUserDto(email, password)];
    }
}