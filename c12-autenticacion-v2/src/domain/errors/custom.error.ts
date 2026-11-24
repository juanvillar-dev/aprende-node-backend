export class CustomError extends Error {
    constructor (
        public readonly statusCode: number,
        public readonly message: string,
        public readonly context?: string,
    ){
        super(message);
    }
    


    static badRequest(message: string, context?: string): CustomError{
        return new CustomError(400, message, context);
    }


    static unauthorized(message: string, context?: string): CustomError{
        return new CustomError(401, message, context);
    }


    static forbidden(message: string, context?: string): CustomError{
        return new CustomError(403, message, context);
    }


    static notFound(message: string, context?: string): CustomError{
        return new CustomError(404, message, context);
    }


    static internalServer(message: string, context?: string): CustomError{
        return new CustomError(500, message, context);
    }
}