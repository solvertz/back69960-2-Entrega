import { ProductModel } from "./model/product.model.js";


export default class ProductDBManager {

    async getProducts(page= 1, limit= 5, category, sort ){
        try {
            const filter = category ? {'category': category}: {}; 
            let sortOrder = {};
            if (sort === 'asc' || sort === 'desc') {
                sortOrder.price = sort === 'asc' ? 1 : -1;
            }
            const documents = await ProductModel.paginate( filter, { page, limit, sort: sortOrder});
            return documents; 
        } catch (error) {
            throw new Error(error);
        }
       
        
    }

    //id no existe => retorna error 500, x q no retorna el prod no exist 
    async getProductById(id){
        try {
            const product = await ProductModel.findById(id);
            if(!product) throw new Error("El producto no existe");
            return product;

        } catch (error) {
            throw new Error(error);
        }
        
    }

    async addProduct(product){
        try {
            return await ProductModel.create(product);
        } catch (error) {
            throw new Error(error);
        }
       
    }
    
    async updateProduct(id, product){
        try {
            return await ProductModel.findByIdAndUpdate(id, product, {new: true});
        } catch (error) {
            throw new Error(error);
        }
        
    }
    
    async deleteProducts(id){
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
    
        }
        
    }

}