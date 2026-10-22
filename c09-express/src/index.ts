import express, { Router, type NextFunction, type Request, type Response } from "express"
import { productos } from "./data/productos.js";


/*------------------------------------------------------------------------------------------------------
    CREAR APP
------------------------------------------------------------------------------------------------------*/
const app = express();



/*------------------------------------------------------------------------------------------------------
    MIDDLEWARES
------------------------------------------------------------------------------------------------------*/
app.use(express.json());



/*------------------------------------------------------------------------------------------------------
    MIDDLEWARES | ACCION ANTES DE LLEGAR A LA RUTA FINAL
------------------------------------------------------------------------------------------------------*/
app.use((req, res, next)=>{
    console.log("Ejecutando antes de cada accion");
    console.log(req.params);
    console.log(req.body);

    next();
})



/*------------------------------------------------------------------------------------------------------
    MIDDLEWARES | DE ERROR
------------------------------------------------------------------------------------------------------*/
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.error("Error en la API: "+err.stack);
    res.status(500).send("Algo salio mal");
})



/*------------------------------------------------------------------------------------------------------
    ROUTERS
------------------------------------------------------------------------------------------------------*/
function getRouter(): Router{
    const router = Router();

    
    router.get("", (req, res)=> {
        res.json(productos)
    })
    
    
    router.post("", (req, res)=>{
        const producto = req.body;
        productos.push(producto);
        res.json(producto);
    })

    return router;
}

app.use("/productos", getRouter());



/*------------------------------------------------------------------------------------------------------
    INICIAR SERVIDOR
------------------------------------------------------------------------------------------------------*/
app.listen(3000, ()=>{
    console.log(`Server running http://localhost:3000`)
});