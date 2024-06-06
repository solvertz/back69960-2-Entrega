export const productValidator = (req, res, next)=>{
    if (req.body.title === undefined || 
        req.body.description === undefined ||
        req.body.code === undefined ||
        req.body.price === undefined || 
        req.body.stock === undefined ||
        req.body.category === undefined ||
        req.body.thumbnails === undefined){
            res.status(400).json({msg: "Ingresar todos datos"});
        }else{
            req.body.status = true; 
            next();
        }
}
// este midd lo utilizo en products.router.js para validar lo que viene por body 