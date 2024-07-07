import { Schema, model} from 'mongoose';

const CartSchema = new Schema({
    products: [
        { _id: false,
            quantity: { type: Number, default: 1},
            product: { type: Schema.Types.ObjectId, ref: 'products' }
        }
    ]

});

/* CartSchema.pre('find', function(){
    this.populate('products');
}) */

export const CartModel = model ("cart", CartSchema);



