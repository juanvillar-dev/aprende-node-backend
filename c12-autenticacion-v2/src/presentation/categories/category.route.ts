import { Router } from "express";
import { CategoryMongoRepository } from "../../infrastructure.ts/repositories/mongo/category.mongo.repository.js";
import { CategoryService } from "../service/category.service.js";
import { CategoryController } from "./category.controller.js";
import { UserMongoRepository } from "../../infrastructure.ts/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class CategoryRouter {
    getRouter(){
        const router = Router();

        
        const categoryRepository = new CategoryMongoRepository();
        const userRepository = new UserMongoRepository();
        const categoryService = new CategoryService(categoryRepository, userRepository);
        const categoryController = new CategoryController(categoryService);


        router.get("", [AuthMiddleware.validateJwt],categoryController.findAllCategories);
        router.get("/:id", categoryController.findCategoryById);
        router.post("",[AuthMiddleware.validateJwt], categoryController.createCategory);
        router.patch("/:id", categoryController.updateCategory);
        router.delete("/:id", categoryController.deleteCategoryById);


        return router;
    }
}
