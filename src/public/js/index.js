const socket = io();

const form = document.getElementById("form");

const productsList = document.getElementById("productsList");

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;   
    const code = document.getElementById("code").value;   
    
    const product = {
        title,
        description,
        price,
        stock,
        category,
        status,
        code,
        
    };
    socket.emit("newProduct", product);
    form.reset();
};

socket.on('products',  (products)=>{
    let listaProducts = "";
    products.forEach((prod) => {
        listaProducts += `
        <div class="card-body">
            <h3 class="card-text">ID: ${prod._id}</h3>
            <h5 class="card-title">TITULO: ${prod.title}</h5>
            <h4 class="card-text">PRECIO: $ ${prod.price}</h4>
            <p class="card-text">DESCRIPCIÓN: ${prod.description}</p>
            <p class="card-text"> STOCK: ${prod.stock}</p>
            <p class="card-text"> CATEGORIA:${prod.category}</p>
            <p class="card-text">ESTADO: ${prod.status}</p>
            <p class="card-text">CÓDIGO: ${prod.code}</p>
            <p class="card-text">CÓDIGO: ${prod.thumbnail}</p>

            <button type="button"  class="btn btn-danger" onclick="eliminarProducto(${prod._id})">eliminar</button>
        </div>`;
        
    });
    productsList.innerHTML = listaProducts;
});

function eliminarProducto(_id){
    socket.emit("deleteProduct", _id);
    console.log("id del eliminar", (_id));
}; 


    