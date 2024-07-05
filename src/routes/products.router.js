import { Router } from "express";
import { productValidator } from "../middleware/productValidate.js";

import ProductDBManager from "../manager/productDBManager.js";
const ProductService = new ProductDBManager();  

const router = Router(); 

/* import ProductManager from '../manager/productManager.js'; 

const ProductService = new ProductManager("./src/data/products.json"); */


//obtener los productos 
router.get("/", async(req, res, next)=>{
    try {
        const { page, limit, category, sort } = req.query; 
        const products = await ProductService.getProducts( parseInt( page) ,  parseInt(limit), category, sort); 
        const nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null; 
        const prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null
        res.status(200).json({
            status: 'success',
            payload: products.docs,
            totalDocs: products.totalDocs,
            totalPage : products.totalPage,
            nextPage: products.nextPage,
            prevPage: products.prevPage,
            page: products.page,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage,
            prevLink,
            nextLink

        }); 
        
    } catch (error) {
        next (error); 
    } 
}); 

// obtener por id 
router.get("/:id", async(req, res, next)=>{
    try {
        const { id } = req.params; 
        const products = await ProductService.getProductById(id);
        res.status(200).json(products); 
        
    } catch (error) {
        next (error); 
    }
    
}); 

//obtener datos x body 

router.post("/",productValidator, async(req, res, next)=>{
    try {
        console.log(req.body)
        const product = await ProductService.addProduct(req.body);
        
        if(product) res.status(201).json(product); 
        else res.status(404).json({ msg: "Error al crear el producto" });
        
    } catch (error) {
        next (error); 
    }
});

//eliminar un producto por id 
router.delete("/:id", async(req, res, next)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await ProductService.deleteProducts(id);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al borrar el producto" });
        
    } catch (error) {
        next (error);  
    }
});

// metodo para actualizar funciona bien !

router.put("/:id",productValidator, async(req, res, next)=>{
    try {
        const { id } = req.params; 
        console.log(id);
        const products = await ProductService.updateProduct(id, req.body);
        if(products) res.status(200).json(products); 
        else res.status(404).json({ msg: "Error al actualizar el producto" });

    } catch (error) {
        next (error); 
    }
});

export default router 
