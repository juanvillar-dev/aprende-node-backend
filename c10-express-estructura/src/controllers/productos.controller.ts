import type { Request, Response } from "express";
import { Producto } from "../models/producto.js";
import type { ProductoService } from "../services/productos.service.js";

export class ProductosController {

    constructor(private service: ProductoService){}


    /*------------------------------------------------------------------------------------------------------
        Los métodos se declaran como arrow function para conservar el binding de "this".
        Express los invoca sueltos (sin receiver), y en modo estricto "this" sería undefined.
    ------------------------------------------------------------------------------------------------------*/

    listar  = (req: Request, res: Response) => {
        res.json({
            mensaje: 'listado de productos',
            datos: this.service.listar()
        })
    }



    buscar  = (req: Request, res: Response) => {
        const id = +req.params.id;
        const producto = this.service.buscar(id);

        if(!producto){
            res.status(404).json({error: `Producto ${id} no encontrado`});
            return;
        }

        res.json({datos: producto});
        
    }



    crear   = (req: Request, res: Response) => {
        const {nombre, precio, stock} = req.body ?? {};

        if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
            res.status(400).json({ error: 'Se requieren los campos "nombre", "precio" y "stock"' });
            return;
        }
        
        const producto = this.service.crear(new Producto(0, nombre, precio, stock));

        res.status(201).json({ mensaje: 'Producto creado', datos: producto });
    }
}