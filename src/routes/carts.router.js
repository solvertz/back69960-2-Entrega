
import { Router } from "express";

const router = Router();

import cartManager from "../manager/cartManager.js"
const manager = new cartManager("./src/data/carts.json");

// ponemos solo la barra y desde el server el prefijo 



// para crear un carrito con id y [], 
router.post("/", async(req, res)=>{
    try {
        /* const cart = await manager.createCart();
        if(cart) res.status(201).json(cart);
        else res.status(404).json({msg: "cart no encontrado"}); */ 
        res.status(201).json(await manager.createCart()); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }

})
//lista los productos que pertenecen al acrrito con ese id 
router.get("/:cid", async(req, res)=>{
    try {
        const { cid } = req.params;
        const cart = await manager.getCartById(cid);
        if(cart) res.status(201).json(cart);
        else res.status(404).json({msg: "El carrito no existe"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
        
    }

})

router.post("/:cid/product/:pid",async(req, res)=>{
    try {
        const {cid, pid } = req.params;
        const cartId = Number(cid);
        const productId = Number(pid);
        console.log(cartId, productId);
        const respuesta = await manager.addProductToCart(cartId, productId); 
        res.status(200).json(respuesta);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message}); 
    }

})
//ruta para agregar el producto al carrito 
// product: solo debe contener el id del producto 
//quantity debe contener el numero de ejemplares del producto



export default router 
