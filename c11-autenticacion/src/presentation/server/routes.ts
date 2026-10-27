import { Router } from "express";
import { AuthRouter } from "../auth/auth.router.js";

export class AppRouter {
    getRouters() {
        const router = Router();

        const authRouter = new AuthRouter();
        router.use("/auth", authRouter.getRouters());

        return router;
    }
}