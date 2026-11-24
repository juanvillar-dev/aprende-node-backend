import type { Request, Response } from "express";
import { CreateCategoryDto, CustomError, UpdateCategoryDto } from "../../domain/index.js";
import type { CategoryService } from "../service/category.service.js";
import { PaginationDTO } from "../../domain/dtos/pagination.dto.js";

export class CategoryController {
    constructor (
        private categoryService: CategoryService
    ){}




    handlerError = (err: unknown, res: Response) =>{
        if(err instanceof CustomError){
            return res.status(err.statusCode).json({error: err.message});
        }
        console.log("Error del servidor", `${err}`);
        return res.status(500).json({error: "Error del servidor"})
    }




    createCategory = (req: Request, res: Response) => {
        //  SE OBTIENE LA DATA 
        const [err, dto] = CreateCategoryDto.create(req.body);
        
        if(err) return res.status(400).json({error: err});
        
        //  SE OBTIENE EL USUARIO DEL TOKEN (AuthMiddleware)
        const userJwt = req.user;

        if(!userJwt) return res.status(401).json({error: 'Usuario no autenticado'});

        this.categoryService.createCategory(dto!, userJwt)
            .then((category) => res.status(201).json(category))
            .catch((error) => this.handlerError(error, res));
    }





    findAllCategories = (req: Request, res: Response) => {

        const {page = 1, limit = 10} = req.query;

        const [err, dto] = PaginationDTO.create(+page , +limit);
        if(err) return res.status(400).json({error: err});

        this.categoryService.findAllPaginatedCategories(dto!)
            .then((categories) => res.json(categories))
            .catch((error) => this.handlerError(error, res));
    }












    findCategoryById = (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        this.categoryService.findCategoryById(id as string)
            .then((category) => res.json(category))
            .catch((error) => this.handlerError(error, res));
    }




    updateCategory = (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        const [err, dto] = UpdateCategoryDto.create(req.body);

        if(err) return res.status(400).json({error: err});

        this.categoryService.updateCategory(id as string, dto!)
            .then((category) => res.json(category))
            .catch((error) => this.handlerError(error, res));
    }




    deleteCategoryById = (req: Request, res: Response) => {
        const { id } = req.params;

        if(!id) return res.status(400).json({ error: "ID no proporcionado" });

        this.categoryService.deleteCategoryById(id as string)
            .then((category) => res.json(category))
            .catch((error) => this.handlerError(error, res));
    }
}
