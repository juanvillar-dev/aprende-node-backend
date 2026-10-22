import { Router } from "express";
import { ProductosController } from "../controllers/productos.controller.js";
import { ProductoService } from "../services/productos.service.js";



/*------------------------------------------------------------------------------------------------------
    RUTAS DE PRODUCTOS
    Solo define el método y la URL. La lógica vive en el controlador.
------------------------------------------------------------------------------------------------------*/

export const productosRouter = Router();
const service = new ProductoService();
const controlador = new ProductosController(service);


productosRouter.get ('/'    , controlador.listar);
productosRouter.get ('/:id' , controlador.buscar);
productosRouter.post('/'    , controlador.crear );