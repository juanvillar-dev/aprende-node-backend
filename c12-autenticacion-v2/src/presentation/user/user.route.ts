import { Router } from "express";
import { UserMongoRepository } from "../../infrastructure.ts/repositories/mongo/user.mongo.repository.js";
import { UserService } from "../service/user.service.js";
import { UserController } from "./user.controller.js";

export class UserRouter {
    getRouter(){
        const router = Router();
        
        const userRepository = new UserMongoRepository();
        const userService = new UserService(userRepository);
        const userController = new UserController(userService);

        router.get("", userController.findAllUsers);
        router.get("/:id", userController.findUserById);
        router.patch("/:id", userController.updateUser);
        router.delete("/:id", userController.deleteUser);

        return router;
    }
}
