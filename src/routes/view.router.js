import express from 'express';
import { Router } from "express";
import ProductManager from '../manager/productManager.js';

const productManager = new ProductManager("./src/data/products.json");

const router = Router();

router.get("/products", async(req, res) => {
    //const {page, limit} = req.query;
    try{
        const products = await productManager.getProducts({ page: req.query.page, limit: req.query.limit });
        console.log(products); 
        res.render("home", {products}); 

    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }

    
})

router.get("/realtimeProducts", (req, res) => {
    res.render("realTimeProducts"); 
})

export default router