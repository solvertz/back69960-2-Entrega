http://http://localhost:8080/products
http://http://localhost:8080/realTimeProducts

THUNDER CLIENT

​🔴 ​PRODUCTS ​🔴​      🛒

GET: 
localhost:8080/api/products        ✔️​
localhost:8080/api/products/66847f6a759177a349befc64        ✔️​
localhost:8080/api/products?page=2        ✔️​
localhost:8080/api/products?category=verduleria        ✔️​
localhost:8080/api/products?sort=asc        ✔️​
localhost:8080/api/products?sort=desc        ✔️​

PUT:
localhost:8080/api/products/668dbe2325eaf137d0a307c4        ✔️​
'''
{
    "code": "BER825",
    "price": 2800
}

POST
localhost:8080/api/products    ✔️​
'''
{
    "title": "Zapallitos ",
    "description": "redondos",
    "code": "za723",
    "price": 2800,
    "stock": 6,
    "category": "verduleria",
    "thumbnails": ["zapallito.jpg"]
}'''

DELETE
localhost:8080/api/products/668dbcf025eaf137d0a307bc    ✔️​

📌 CART 🛒  

GET
✔️​  TRAER TODOS LOS PRODUCTOS:  localhost:8080/api/cart  ✔️​
✔️​  BUSCAR UN CARRITO POR ID + POPULATE: localhost:8080/api/cart/cid  ✔️​ 


POST
✔️​  CREACIÓN DEL CARRITO:  localhost:8080/api/cart
✔️​  AGREGAR UN PRODUCTO AL CARRITO:  localhost:8080/api/cart/66870a18053bc6eb7606fac2/product/668478d144426e96d2951c73 

PUT 
✔️​  Actualizar QUANTITY:  localhost:8080/api/cart/66870a18053bc6eb7606fac2/product/66847f6a759177a349befc64
        {
            "quantity": 9
        }

✔️ AGREGAR UN PROD POR BODY & VACIAR EL CARRITO POR BODY:  localhost:8080/api/cart/66870a18053bc6eb7606fac2
'''
  {
    "$push": {
            "products": {
                "product": "66847f6a759177a349befc64",
                "quantity": 3
                    
                }
            }
        }

        { 
        "$set": {
            "products": []
        }
        }'''

​ DELETE 
✔️  ELIMINAR UN CARRITO: localhost:8080/api/cart/668dc26225eaf137d0a307d3
✔️  VACIAR UN CARRITO:  localhost:8080/api/cart/6687297f1d15b075804b605d/clear  
✔️  ELIMINAR UN PRODUCTO DEL CARRITO: localhost:8080/api/cart/6687297f1d15b075804b605d/product/66847f6a759177a349befc64