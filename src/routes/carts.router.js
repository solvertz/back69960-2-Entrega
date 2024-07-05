
import { Router } from "express";

const router = Router();

/* import cartManager from "../manager/cartManager.js"
const manager = new cartManager("./src/data/carts.json"); */

import CartBDManager from "../manager/cartBDManager.js";
const manager = new CartBDManager(); 

    // para crear un carrito con id y [], 
router.post("/", async(req, res, next)=>{
    try {
        res.status(201).json(await manager.createCart()); 
        
    } catch (error) {
        next(error.message); 
    }
})

router.get("/", async(req, res, next)=>{
    try {
        res.status(200).json(await manager.getCarts());
        
    } catch (error) {
        next(error.message);
    }

})


router.get("/:cid", async(req, res, next)=>{
    try {
        const { cid } = req.params;
        console.log(cid); 
        const cart = await manager.getCartById(cid);
        res.status(200).json(cart);
        
        
    } catch (error) {
        next(error.message);
    }
})

router.post("/:idCart/product/:idProduct",async(req, res, next)=>{
    try {
        const { idCart, idProduct } = req.params;
        res.status(200).json(await manager.addProductToCart(idCart, idProduct));
        
    } catch (error) {
        next(error.message);
    }

})


router.delete("/:cid/product/:pid", async(req, res, next)=>{
    try {
        const { cid, pid } = req.params;

        const eliminarProduct = await manager.removeProductToCart( cid, pid );
        if(!eliminarProduct) res.json({ msg: "error al eliminar producto del carrito"})
        else res.status(200).json({msg: `producto: ${pid} eliminado del carrito`});
        
        
    } catch (error) {
        next(error.message);
    }

})
router.put("/:cid/product/:pid", async(req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updateQuantityProduct = await manager.updateQuantityProductInCart( cid, pid, quantity);
        if(updateQuantityProduct) res.status(200).json(updateQuantityProduct);
        else res.status(404).json({msg: "La cantidad no se actualizo"});

    } catch (error) {
        next(error.message); 
    }  
})

router.put("/:cid", async(req, res, next) =>{
    try {
        const { cid } = req.params;
        const updateCart = await manager.update(cid, req.body);
        if(updateCart) res.status(200).json({msg: "El carrito se actualizo"});
        else res.status(404).json({msg: "El carrito no se actualizo"});
        
    } catch (error) {
        next(error.message); 
    }  
})



router.delete("/:cid", async(req, res, next) => {
    try {
        const { cid } = req.params;
        const deletedCart = await manager.delete(cid);
        if(deletedCart) res.status(200).json({msg: `carrito: ${cid} eliminado`});
        else res.status(404).json({msg: "El carrito no se pudo borrar"});
        
    } catch (error) {
        next(error.message);
    }
})

router.delete("/:idCart/clear", async(req, res, next) => {
    try {
        const { idCart } = req.params;
        const setCart = await manager.clearCart(idCart);
        if(setCart) res.status(200).json({msg: "carrito vaciado con exito!"});
        else res.status(404).json({msg: "El carrito no se pudo borrar"});
        
    } catch (error) {
        next(error.message);
    }
})

export default router 
