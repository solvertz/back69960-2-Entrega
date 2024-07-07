import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    title: {type: "string", required: true },
    description: {type: "string", required: true },
    code: {type: "string", required: true},
    price: { type: Number, required: true},
    stock: {type: Number, required: true},
    category: {type: "string", required: true},
    thumbnail: { type: [String], required: false, default: [] }

}); 

productSchema.plugin(mongoosePaginate);  


export const ProductModel = model("products", productSchema); 