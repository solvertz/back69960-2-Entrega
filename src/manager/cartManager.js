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
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, "\t")); 
            console.log("carrito creado con éxito")
            return cart
            
        } catch (error) {
            console.log(error); 
             
        }
    }
    async getCartById(id){
        try {
            const cart = this.carts.find(cart => cart.id === id);
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
            console.log(`cartEsist${cartExist.products}`);
            console.log(cartExist);
            if(!cartExist) return "el carrito no existe";
            const productExist = await manager.getProductById(idProduct);
            console.log(productExist);
            if(!productExist) return "el producto no existe";
            
            const existProdInCart = cartExist.products.find((p)=>p.product === Number(idProduct));
            console.log(`existProdInCart ${existProdInCart}`); //devuelve undefined ?????
            if(!existProdInCart) {
                const product = {
                    product: idProduct,
                    quantity: 1
                };
                cartExist.products.push(product);

            }else existProdInCart.quantity += 1;
            const actualizarProduct = this.carts.map((cart)=>{
                if(cart.id === idCart) return cartExist;
                return cart;
            });
            await fs.promises.writeFile(this.path, JSON.stringify(actualizarProduct, null, "\t")); 
            console.log("se agregó el producto al carrito");
            return cartExist; // Devuelve el carrito actualizado
            
        } catch (error) {
            console.log(error); 
            return "Error al agregar el producto al carrito";
        }

    }

}