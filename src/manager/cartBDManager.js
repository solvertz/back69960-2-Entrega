import { CartModel } from "./model/cart.model.js";

export default class CartBDManager {
    
    //GET api/carts
    async getCarts(){
        try {
            return await CartModel.find({});
        } catch (error) {
            throw new Error(error);
        }
        
    }

    //GET api/carts/cid  ✔️​
    async getCartById(id){
        try {
            const cart = await CartModel.findById(id).populate('products.product');
            if(!cart) throw new Error("El carrito no existe");
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    //POST api/carts  ✔️​
    async createCart(){
        try {
            return await CartModel.create({products: []});
        } catch (error) {
            throw new Error(error); 
        }
    }


    //DELETE api/carts/:cid ✔️​
    async delete(id){
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async existProdInCart(idCart, idProduct){
        try {
            return await CartModel.findOne({
                _id: idCart,
                products: { $elemMatch: {product: idProduct}}
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    
 
    //PUT api/carts/:cid/products/:pid
    // funciona agregar un producto al carrito, si lo quiero volver a agregar no funciona 
   /*   async addProductToCart(idCart, idProduct){

        try {
            const productExists = await this.existProdInCart(idCart, idProduct);
            console.log(productExists);
            if(productExists){
                return await CartModel.findByIdAndUpdate({_id : idCart, 'products.product': idProduct},
                    { $inc: { 'products.$.quantity': productExists.products[0].quantity +1 } },
                    
                    {new: true}
                );

            }else{
                return await CartModel.findByIdAndUpdate(idCart, { $push: { products: { product: idProduct, quantity: 1 } } }, {new: true});
            }
           
        } catch (error) {
            throw new Error(error);
        }
    }  */ 
        //PUT api/carts/:cid/products/:pid ✔️​
         async addProductToCart(idCart, idProduct) {
            try {
                const cart = await CartModel.findById(idCart);
                if (!cart) {
                    throw new Error('El carrito no existe');
                }
        
                const productIndex = cart.products.findIndex(p => p.product.toString() === idProduct);
                
                if (productIndex > -1) {
                    // Producto existe, incrementar la cantidad
                    cart.products[productIndex].quantity += 1;
                } else {
                    // Producto no existe, agregar nuevo producto
                    cart.products.push({ product: idProduct, quantity: 1 });
                }
        
                await cart.save();
                return cart;
        
            } catch (error) {
                throw new Error(error.message);
            }
        }  

    //DELETE api/carts/:cid/products/:pid  ✔️​
    //eliminar del carrito el producto seleccionado 

    async removeProductToCart(idCart, idProduct) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                idCart, 
                { $pull: { products: { product: idProduct } } },
                { new: true }
            );
    
            if (!cart) {
                throw new Error('El carrito no existe');
            }
    
            return cart;
            
        } catch (error) {
            throw new Error(error);
        }
    }
    //PUT api/cart/:cid/product/:pid"  ✔️​
    async updateQuantityProductInCart(idCart, idProduct, quantity) {
        try {
            const cart = await CartModel.findById(idCart);
            if (!cart) {
                throw new Error('El carrito no existe.');
            }
    
            const productIndex = cart.products.findIndex(prod => prod.product.toString() === idProduct);
            if (productIndex === -1) {
                throw new Error('El producto no está en el carrito.');
            }
    
            // Actualizar la cantidad del producto en el array products
            cart.products[productIndex].quantity = quantity;

            await cart.save();
            return cart;
    
        } catch (error) {
            throw new Error(error.message);
        }
    } 

  /*   //actualizar el Quantity
    //PUT api/carts/:cid/products/:pid
    async updateQuantityProductInCart(idCart, idProduct, quantity){
        try {
            const cart = await CartModel.findById(idCart);
            if(cart){
                return await CartModel.findByIdAndUpdate(idCart, { $set: { 'products.$.quantity': quantity } },
                { new: true} );
            }else  throw new Error('El producto no está en el carrito.');
            
            
        } catch (error) {
            throw new Error(error);
        }
    } */

    //DELETE api/cart/:cid/clear  ✔️​  
    async clearCart(idCart){
        try {
            return await CartModel.findByIdAndUpdate(idCart, { $set: { products: [] }}, { new: true});
        } catch (error) {
            throw new Error(error);
        }
    }
    
    //PUT api/cart/:cid   ✔️​    
    async update(idCart, obj){  
        try {
            return await CartModel.findByIdAndUpdate(idCart, obj,  { new: true});
        } catch (error) {
            throw new Error(error);
        }
    }

    //vaciar el carrito
   /*  { 
        "$set": {
            "products": []
        }
    } */
//agregar un producto al cart
       /*  {
            "$push": {
                "products": {
                    "product": "66847f6a759177a349befc64",
                    "quantity": 3
                    
                }
            }
        } */

   
}






