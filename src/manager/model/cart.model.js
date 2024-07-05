import { Schema, model} from 'mongoose';

const CartSchema = new Schema({
    products: [
        { _id: false,
            quantity: { type: Number, default: 1},
            product: { type: Schema.Types.ObjectId, ref: 'Product'}
        }
    ]

});

export const CartModel = model ("cart", CartSchema);



