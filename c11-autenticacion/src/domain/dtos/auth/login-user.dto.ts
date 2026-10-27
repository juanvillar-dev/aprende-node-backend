export class LoginUserDto{
    constructor(
        public readonly email: string,
        public readonly password: string,
    ){}


    static create(object: any) : [string?, LoginUserDto?] {
        if(!object) return ["No hay datos"];

        const {email, password} = object;

        if(!email)                          return ["Falta email" ];
        if(!password)                       return ["Falta el password"];

        return [undefined, new LoginUserDto(email, password)];
    }
}