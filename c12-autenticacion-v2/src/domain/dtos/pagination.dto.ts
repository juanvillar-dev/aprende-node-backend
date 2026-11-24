export class PaginationDTO{
    constructor(
        public readonly page: number,
        public readonly limit: number,
    ){}


    static create(page: number, limit: number): [string?, PaginationDTO?]{

        if(typeof page !== "number" || page < 0)   return ["page incorrecto"];
        if(typeof limit !== "number" || limit < 0)   return ["limit incorrecto"];

        return [undefined, new PaginationDTO(page, limit)];
    }
}