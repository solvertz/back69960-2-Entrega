import { Router } from "express";


const router = Router(); 

import ProductManager from '../manager/productManager.js'; 
import { productValidator } from "../middleware/productValidator.js";
const manager = new ProductManager("./src/data/products.json");
//console.log(manager);

//obtener los productos 
// accedo al limit cons destructuring, si no vine es undefined, limit es string ver como parsear 
router.get("/", async(req, res)=>{
    try {
        const { limit } = req.query; 
        const products = await manager.getProducts(parseInt(limit)); //asi funciona 
        res.status(200).json(products); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
    
}); 

// obtener por id 
router.get("/:id", async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.getProductById(id);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "El producto no existe" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
    
}); 

//obtener datos x body 
// ver la validacion de los datos 
//-------------------------------------------no funciona crear products 
router.post("/", productValidator, async(req, res)=>{
    try {
        console.log(req.body)
        const product = await manager.addProduct(req.body);
        
        if(product) res.status(201).json(product); 
        else res.status(404).json({ msg: "Error al crear el producto" });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }
    
});

//eliminar un producto por id 
router.delete("/:id", async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.deleteProducts(id);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al borrar el producto" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }



    
});
// metodo para actualizar funciona bien !

router.put("/:id", async(req, res)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await manager.updateProduct(id, req.body);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al actualizar el producto" });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
        
    }

    
});



export default router 
// al importarlo en server  me permite cambiarle el nombre 