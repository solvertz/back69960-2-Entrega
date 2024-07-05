import express from 'express'; 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars  from 'express-handlebars';
import viewRouter from './routes/view.router.js'
import { __dirname } from './path.js'; 
import { Server } from 'socket.io'
import { mongoose } from 'mongoose';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'; 

/* import ProductManager from './manager/productManager.js';
const productManager = new ProductManager("./src/data/products.json"); */

import ProductDBManager from './manager/productDBManager.js'
const productManager = new ProductDBManager();  
console.log(productManager.getProducts());
console.log(productManager);


const app = express();

async function main() {
    await mongoose.connect('')
}
main(); 

app.use(express.json()); // para recibir datos json 
app.use(express.urlencoded({extended: true})); // mid para datos que se envian por params
app.use(express.static(`${__dirname}/public`)); // si no lo agrego no funcionan los style

app.use("/api/cart", cartsRouter); 
app.use("/api/products", productsRouter)

// Configuración de Handlebars
/* const hbs = handlebars.create({
    defaultLayout: 'main', // Esto es opcional si no estás utilizando un diseño principal
    extname: '.handlebars', // Extensión de archivo para tus vistas
    handlebars: allowInsecurePrototypeAccess(handlebars)
}); */

app.engine('handlebars', handlebars.engine()); //configuración de hds 
app.set('view engine', 'handlebars'); //mor de plantilla a utilizar 
app.set('views', `${__dirname}/views`); // ubicación de la carpeta para las vistas 



app.use('/', viewRouter); //enrutador de vistas



const PORT = 8080; 

const httpServer = app.listen(PORT, ()=>console.log(`servidor ok en http://localhost:${PORT}`)); 

const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    
    console.log(`Nuevo usuario conectado:  ${socket.id}`);
    socket.emit('products', await productManager.getProducts());
    
    
    socket.on('newProduct', async(product) => {
        try {
            await productManager.addProduct(product);
            socket.emit('products', await productManager.getProducts());
        } catch (error) {
            console.error(`error en la creación del producto ${error.mensaje}`);
        }
    }); 

    socket.on('deleteProduct', async(_id) =>{
        try {
            await productManager.deleteProducts(_id)
            socket.emit('products', await productManager.getProducts());
        } catch (error) {
            console.error(`error en la eliminación del producto ${error.mensaje}`);
        }
    });
    

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    });

})