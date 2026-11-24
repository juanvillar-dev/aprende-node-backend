export class UpdateUserDto {
    constructor(
        public name?: string,
        public password?: string,
        public img?: string,
    ){}


    static create(object: any): [string?, UpdateUserDto?] {
        if(!object)                                    return ["No hay datos"];

        const { name, password, img } = object;

        // VALIDACIONES : PUEDES OMITIR PARA PRUEBAS DE POSTMAN, PERO NO PARA EL FRONTEND
        // if(name === undefined && password === undefined && img === undefined)
        //                                                return ["No hay campos para actualizar"];
        // if(name !== undefined && (typeof name !== 'string' || !name.trim()))
        //                                                return ["Nombre inválido"];
        // if(password !== undefined && (typeof password !== 'string' || password.length < 6))
        //                                                return ["El password es muy corto"];
        // if(img !== undefined && typeof img !== 'string')
        //                                                return ["Imagen inválida"];


        return [undefined, new UpdateUserDto(name, password, img)];
    }
}
