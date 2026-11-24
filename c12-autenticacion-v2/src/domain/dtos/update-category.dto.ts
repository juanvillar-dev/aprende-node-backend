export class UpdateCategoryDto {
    constructor(
        public name?: string,
        public available?: boolean,
    ){}


    static create(object: any): [string?, UpdateCategoryDto?] {
        if(!object)                                    return ["No hay datos"];

        const { name, available } = object;

        // VALIDACIONES : PUEDES OMITIR PARA PRUEBAS DE POSTMAN, PERO NO PARA EL FRONTEND
        // if(name === undefined && available === undefined)
        //                                                return ["No hay campos para actualizar"];
        // if(name !== undefined && (typeof name !== 'string' || !name.trim()))
        //                                                return ["Nombre inválido"];
        // if(available !== undefined && typeof available !== 'boolean')
        //                                                return ["'available' debe ser booleano"];

        return [undefined, new UpdateCategoryDto(name?.trim(), available)];
    }
}
