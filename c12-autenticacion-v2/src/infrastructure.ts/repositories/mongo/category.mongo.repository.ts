import mongoose from "mongoose";
import { CategoryModel } from "../../../data/index.js";
import { CustomError, type ICategoryRepository } from "../../../domain/index.js";

export class CategoryMongoRepository implements ICategoryRepository {
    createCategory(category: any): Promise<any> {
        const { name, user, available = true } = category;
        const newCategory = new CategoryModel({ name, user, available });
        return newCategory.save();
    }


    findAllCategories(): Promise<any> {
        return CategoryModel.find().populate('user');
    }


    async findAllPaginatedCategories(page: number=1, limit: number=10){
        const total = await CategoryModel.countDocuments();
        const categories = await CategoryModel.find()
            .skip((page-1)*limit)
            .limit(limit)
            .populate('user');

        return {
            page: page,
            limit: limit,
            total: total,
            categories: categories    
        }
    }


    findCategoryById(id: string): Promise<any> {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw CustomError.badRequest("El id es invalido");
        return CategoryModel.findById(id);
    }


    deleteCategoryById(id: string): Promise<any> {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw CustomError.badRequest("El id es invalido");
        return CategoryModel.findByIdAndDelete(id);
    }


    updateCategory(id: string, category: any): Promise<any> {
        return CategoryModel.findByIdAndUpdate(id, category, { new: true, runValidators: true });
    }
}
