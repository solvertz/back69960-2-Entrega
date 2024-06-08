import fs from 'fs';


class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];

        if(fs.existsSync(this.path)){
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                console.error('Error al leer el archivo', error);
                this.products = [];    
            }
        }else this.products = []; 
    }

    async addProduct(product){
  
         //id Autoincrementable 
        let newId = 0;
        if(this.products.length > 0){
            newId = this.products[this.products.length - 1].id + 1;
        }else{ 
            product.id = 1;
        }
        const status = "";
        const newProduct = {
            id: newId,
            status: true,
            ...product
        }
        console.log(newProduct);

        // agregar al array vacio el producto 
        this.products.push(newProduct); 

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t")); 
            console.log("Producto agregado con éxito");
            return newProduct;
        }catch(error){
            console.error(`Error al escribir el archivo`,error); 

        }
    
    } 
     // no hace falta leer el archivo por que se guarda en el array y en el archivo devolvemos el array 
    getProducts(limit){
        const productLimit = this.products
        if(limit) return productLimit.slice(0, limit); 
        return this.products
    }

    getProductById(idProduct){
        const product = this.products.find((product)=> product.id === Number(idProduct));
        if(!product){
            return null; //devuelve null si no se encontro el prod   
        } 
        return product ;
    }
   
    async deleteProducts(idProduct){
        console.log(idProduct);
        try {
            const productsExist = await this.getProductById(idProduct); 

            if (productsExist){
            const newArray = this.products.filter((product)=>product.id !== Number(idProduct));
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
            console.log("Producto eliminado exitosamente! ")
            return productsExist  //retorna el producto borrado 
            }else return console.log("No se encontro el producto "); 
        
        }catch (error) {
            console.log(error); 
        }  
    }

    // le paso el id y el prod a actualizar 
    async updateProduct(idProduct, product){
        try {
            let productsExist = this.getProductById(idProduct); 
            if (!productsExist) return "el producto no existe";
            //lista de propiedades permitidas poara un producto 
            const updatedProduct = { ...productsExist };
            const allowedProperties = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
            // Crear un nuevo objeto solo con las propiedades permitidas

            for (const key of Object.keys(product)) {
                if (allowedProperties.includes(key)) {
                    updatedProduct[key] = product[key];
                 }
            }
            const newProduct = this.getProducts().filter((product)=> product.id !== Number(idProduct));
            newProduct.push(updatedProduct); //le pusheo el product actualizado
            await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, "\t"));
            console.log("se actualizo el producto correctamente "); 
            return productsExist; 
            
        }catch (error) {
             console.log(error); 
        }
    }

}
export default ProductManager
