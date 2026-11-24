import jwt from "jsonwebtoken";
import { variables } from "./variables.js";


export class JwtAdapter {
    private static jwtSeed: string = variables.email.seed!;

    constructor(){
    }


    static generateToken(payload: object, duration: string = '15m'): Promise<string | null> {
        return new Promise((resolve) => {

            jwt.sign(payload, this.jwtSeed, { expiresIn: duration as any }, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }




    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            
            jwt.verify(token, this.jwtSeed, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
