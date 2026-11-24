import type { PaginationDTO } from "../../domain/dtos/pagination.dto.js";
import { CategoryEntity, CustomError, type UserEntity, type ICategoryRepository, type IUserRepository } from "../../domain/index.js";
import type { ICategoryService } from "../../domain/services/category.service.js";

export class CategoryService {
    constructor (
        private readonly categoryRepository: ICategoryRepository,
        private readonly userRepository: IUserRepository
    ){}



    
    async createCategory(category: any, user: UserEntity): Promise<CategoryEntity> {
        if(!user?.id)
            throw CustomError.unauthorized("Usuario no válido", "CategoryService.createCategory");

        //  VALIDAR USUARIO
        const userBd = await this.userRepository.findUserById(user.id.toString());

        if (!userBd)
            throw CustomError.notFound("El usuario no existe", "CategoryService.createCategory");


        //  CREAR CATEGORIA (el usuario sale del token, no del body)
        const newCategory = await this.categoryRepository.createCategory({
            name: category.name,
            available: category.available,
            user: userBd.id,
        });

        return CategoryEntity.fromModel(newCategory);
    }



    async findAllPaginatedCategories(dto: PaginationDTO): Promise<any> {
        const data = await this.categoryRepository.findAllPaginatedCategories(dto.page, dto.limit);
        const lista =  (data.categories ?? []).map((category: any) => CategoryEntity.fromModel(category));

        return{
            page: data.page,
            limit: data.limit,
            total: data.total,
            categorias: lista
        }
    }




    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.findAllCategories();
        return (categories ?? []).map((category: any) => CategoryEntity.fromModel(category));
    }








    

    async findCategoryById(id: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findCategoryById(id);
        if(!category)
            throw CustomError.notFound("Categoría no encontrada", "CategoryService.findCategoryById");

        return CategoryEntity.fromModel(category);
    }




    async updateCategory(id: string, category: any): Promise<CategoryEntity> {
        await this.findCategoryById(id);

        const data = Object.fromEntries(
            Object.entries(category).filter(([, value]) => value !== undefined)
        );

        const updatedCategory = await this.categoryRepository.updateCategory(id, data);
        if(!updatedCategory)
            throw CustomError.notFound("Categoría no encontrada", "CategoryService.updateCategory");

        return CategoryEntity.fromModel(updatedCategory);
    }




    async deleteCategoryById(id: string): Promise<CategoryEntity> {
        const deletedCategory = await this.categoryRepository.deleteCategoryById(id);
        if(!deletedCategory)
            throw CustomError.notFound("Categoría no encontrada", "CategoryService.deleteCategoryById");

        return CategoryEntity.fromModel(deletedCategory);
    }
}
