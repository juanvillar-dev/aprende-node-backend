import { genSaltSync, hashSync } from "bcrypt";

export const bycryptAdapter = {

    // GENERA UN HASH A PARTIR DE UNA CONTRASEÑA
    hash: (password: string) => {
        const saltos = genSaltSync(10);
        return hashSync(password, saltos);
    },



    
    // COMPARA UNA CONTRASEÑA CON UN HASH
    compare: (password: string, hash: string) => {
        return hashSync(password, hash);
    }
    
}