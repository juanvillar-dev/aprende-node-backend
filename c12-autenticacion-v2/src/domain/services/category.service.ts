import type { CategoryEntity } from "../entities/category.entity.js";
import type { UserEntity } from "../entities/user.entity.js";

export interface ICategoryService {
    createCategory(category: any, user: UserEntity): Promise<CategoryEntity>;
    findAllCategories(): Promise<CategoryEntity[]>;
    findCategoryById(id: string): Promise<CategoryEntity>;
    updateCategory(id: string, category: any): Promise<CategoryEntity>;
    deleteCategoryById(id: string): Promise<CategoryEntity>;
}
