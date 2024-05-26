import fs from 'fs';
/* class Product{
    constructor(title, description, code, price, status = true, stock, category, thumbnails){
        this.id = 0, 
        this.title = title,
        this.description = description,
        this.code = code, 
        this.price = price,
        this.status = status,
        this.stock = stock,
        this.category = category,
        this.thumbnails = thumbnails
    }

} */
//le saco el this.product y solo dejo product ya que no voy a usar la clase 

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
        /* if(
            !product.title||
            !product.description||
            !product.code|| 
            !product.price||
            
            !product.stock|| 
            !product.category||
            !product.thumbnails
        ){
            console.log("Ingrese todos los datos")
            return;
        }
        */
       
         //id Autoincrementable 
        let newId = 0;
        if(this.products.length > 0){
            //ingreso al producto con el último id y le sumo 1
            newId = this.products[this.products.length - 1].id + 1;
        }else{ 
            product.id = 1;
        }
        const newProduct = {
            id: newId,
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
    // cuando utilizamos get siempre tiene q devolver algo con un return 

    async deleteProducts(idProduct){
        try {
            
            const productsExist = this.getProductById(idProduct); 
            if (productsExist){
            const newArray = this.products.filter((product)=>product.id !== Number(idProduct));
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
            console.log("Prodducto eliminado exitosamente! ")
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
            productsExist = {...productsExist, ...product}; // actualizo
            const newProduct = this.getProducts().filter((product)=> product.id !== Number(idProduct));
            newProduct.push(productsExist); //le pusheo el product actualizado
            await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, "\t"));
            console.log("se actualizo el producto correctamente "); 
            return productsExist; 
            
        }catch (error) {
             console.log(error); 
        }


    }


}
export default ProductManager




//const manager = new ProductManager("../data/products.json");




/* 

manager.addProduct(new Product("Azucar", "Azucar premium", "1235A", "1000", "true", 5, "almacen", "azucar.img"));
manager.addProduct(new Product("Yerba", "Yerba premium", "1235A", "2000", "true", 5, "almacen", "azucar.img"));
manager.addProduct(new Product("Te", "Te premium", "1235A", "1500", "true", 5, "almacen", "azucar.img")); 
*/
//console.log(manager.getProductById(10)); 

/* console.log(manager.updateProduct(1, {
    title: "cambie el titulo"
})); */