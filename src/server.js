import express from 'express'; 
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars  from 'express-handlebars';
import viewRouter from './routes/view.router.js'
import { __dirname } from './path.js'; 


const app = express();

//middleware 

app.use(express.json()); // para recibir datos json 
app.use(express.urlencoded({extended: true})); // mid para datos que se envian por params

app.use(express.static(`${__dirname}/public`)); // si no lo agrego no funcionan los style



app.use("/api/cart", cartsRouter); 
app.use("/api/products", productsRouter)

app.engine('handlebars', handlebars.engine()); //configuración de hds 
app.set('view engine', 'handlebars'); //mor de plantilla a utilizar 
app.set('views', `${__dirname}/views`); // ubicación de la carpeta para las vistas 

app.use('/', viewRouter); //enrutador de vistas

const PORT = 8080; 
app.listen(PORT, ()=>console.log(`servidor ok en http://localhost:${PORT}`)); 