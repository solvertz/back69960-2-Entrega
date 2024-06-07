import fs from 'fs';

import ProductManager from './productManager.js';
const manager = new ProductManager("./src/data/products.json")
//console.log(manager); 

export default class CartManager {
    constructor (path){
        this.path = path;
        
        if(fs.existsSync(this.path)){
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];    
            }
        }else this.carts = []; 

    }

    getcarts(){
        return this.carts;
    }

    async saveCarts(){
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t")); 
        } catch (error) {
            console.log(error); 
        }
    }

    async createCart(){
        let newId; 
        if(this.carts.length > 0){
            newId = this.carts[this.carts.length - 1].id + 1; 
        }else{ 
            newId = 1;
        }

        const cart = {
            id: newId,
            products: []
        } 
        this.carts.push(cart);
        
        try {
            this.saveCarts();
            console.log("carrito creado con éxito")
            return cart
            
        } catch (error) {
            console.log(error); 
             
        }
    }
    async getCartById(id){
        try {
            const cart = this.carts.find(cart => cart.id === Number(id));
            console.log(cart)
            if(!cart) return null;
            return cart;
            
            
        } catch (error) {
            console.log(error); 
        }
    
    }
// ver el uso del find ya que tengo que buscar en carts la propiedad products 
    async addProductToCart(idCart, idProduct){
        console.log(idProduct, idCart);
        try { //verifico si el carrito y el producto existen 
            const cartExist = await this.getCartById(idCart);
            if(!cartExist) return "el carrito no existe";
            const productExist = await manager.getProductById(idProduct);
            if(!productExist) return "el producto no existe";
            const existProdInCart = cartExist.products.find((p)=>p.product === Number(idProduct));
            if(!existProdInCart) {
                cartExist.products.push({product: idProduct,quantity: 1});
            }else existProdInCart.quantity += 1;
            this.saveCarts()
            console.log("se agregó el producto al carrito");
            return cartExist; // Devuelve el carrito actualizado
            
        } catch (error) {
            console.log(error); 
            return "Error al agregar el producto al carrito";
        }

    }

}