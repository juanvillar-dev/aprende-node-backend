export class CreateCategoryDto {
    constructor(
        public name: string,
        public available: boolean = true,
    ){}


    static create(object: any): [string?, CreateCategoryDto?] {
        if(!object)                                    return ["No hay datos"];

        const { name, available } = object;

        if(!name)                                      return ["Falta nombre"];
        if(typeof name !== 'string')                   return ["El nombre debe ser texto"];
        if(available !== undefined && typeof available !== 'boolean')
                                                       return ["'available' debe ser booleano"];

        return [undefined, new CreateCategoryDto(name.trim(), available ?? true)];
    }
}
