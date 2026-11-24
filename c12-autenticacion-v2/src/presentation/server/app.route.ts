import { Router, type Request, type Response } from "express";
import { AuthRouter } from "../auth/auth.route.js";
import { UserRouter } from "../user/user.route.js";
import { CategoryRouter } from "../categories/category.route.js";

export class AppRouter {
    async getRouter() {
        const router = Router();


        const authRouter = new AuthRouter();
        const userRouter = new UserRouter();
        const categoryRouter = new CategoryRouter();


        router.use("/auth", authRouter.getRouter());
        router.use("/users", userRouter.getRouter());
        router.use("/categories", categoryRouter.getRouter());

        
        return router;
    }
}