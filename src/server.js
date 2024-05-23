import express from 'express'; 

const app = express();


app.get("/", (req,res)=>{
    res.send("Bienvenidos a mi primer proyecto!!")
})








const PORT = 8080; 
app.listen(PORT, ()=>console.log(`servidor ok en http://localhost:${PORT}`)); 