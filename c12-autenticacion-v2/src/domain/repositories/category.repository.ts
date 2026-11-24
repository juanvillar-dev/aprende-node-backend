export interface ICategoryRepository {
    findAllPaginatedCategories(page: number, limit: number): Promise<any>;
    createCategory(category: any): Promise<any>;
    findAllCategories(): Promise<any>;
    findCategoryById(id: string): Promise<any>;
    deleteCategoryById(id: string): Promise<any>;
    updateCategory(id: string, category: any): Promise<any>;
}