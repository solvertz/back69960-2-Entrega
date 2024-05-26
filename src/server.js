import express from 'express'; 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express();

//middleware 

app.use(express.json()); // para recibir datos json 
app.use(express.urlencoded({extended: true})); // mid para datos que se envian por params

app.use("/api/cart", cartsRouter); 
app.use("/api/products", productsRouter)








const PORT = 8080; 
app.listen(PORT, ()=>console.log(`servidor ok en http://localhost:${PORT}`)); 