import type { UserEntity } from "../../domain/index.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
        }
    }
}
