import { compareSync, genSaltSync, hashSync } from "bcrypt";

export class BcryptAdapter {
    static hash(password: string): string{
        const salt = genSaltSync();// Genera una "sal" aleatoria de 10 rondas por defecto
        return hashSync(password, salt);
    }

    static compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}