export class CustomError extends Error {
    constructor(        
        public readonly statusCode: number,
        public readonly message: string,
        public readonly location?: string,
    ){
        super(message);
    }


    //METODOS FACTORY
    static badRequest(message: string, location?: string){
        return new CustomError(400, message, location);
    }


    static unauthorized(message: string, location?: string){
        return new CustomError(401, message, location);
    }

    
    static forbidden(message: string, location?: string){
        return new CustomError(403, message, location);
    }


    static notFound(message: string, location?: string){
        return new CustomError(404, message, location);
    }

 
    static internalServer(message: string, location?: string){
        return new CustomError(500, message, location);
    }
    
}