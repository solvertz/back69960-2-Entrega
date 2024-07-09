import express from 'express';
import { Router } from "express";
import { ProductModel } from '../manager/model/product.model.js'; 

/* import ProductManager from '../manager/productManager.js';
const productManager = new ProductManager("./src/data/products.json"); */

import ProductDBManager from '../manager/cartBDManager.js'
const productManager = new ProductDBManager();  

const router = Router();

router.get("/products", async(req, res) => {
    const {page, limit} = req.query;
    try{
        const products = await ProductModel.paginate({}, { page, limit });
       console.log(products)
        res.render("home", {products}); 

    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }    

    
})

router.get("/realtimeProducts", async (req, res) => {
    res.render("realTimeProducts"); 
})

export default router