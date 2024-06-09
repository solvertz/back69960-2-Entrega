export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Propiedades esperadas para un producto
    const expectedProperties = ['title', 'description', 'code', 'price', 'stock', 'category', 'thumbnails'];

    // Verificar que no existan propiedades adicionales
    for (const key in req.body) {
        if (!expectedProperties.includes(key)) {
            return res.status(400).json({ msg: `Propiedad inesperada: ${key}` });
        }
    }

    if (req.method === 'POST') {
        // Verificar que todas las propiedades necesarias estén definidas
        if (title === undefined || 
            description === undefined ||
            code === undefined ||
            price === undefined || 
            stock === undefined ||
            category === undefined ||
            thumbnails === undefined) {
                return res.status(400).json({ msg: "Ingresar todos los datos" });
        }

        // Asegurarse de que no se incluya el id en la creación de productos
        if (req.body.id !== undefined) {
            return res.status(400).json({ msg: "No se permite definir el id en la creación de productos" });
        }
    }

    // Verificar los tipos de datos
    if ((title !== undefined && typeof title !== 'string') ||
        (description !== undefined && typeof description !== 'string') ||
        (code !== undefined && typeof code !== 'string') ||
        (price !== undefined && typeof price !== 'number') ||
        (stock !== undefined && typeof stock !== 'number') ||
        (category !== undefined && typeof category !== 'string') ||
        (thumbnails !== undefined && !Array.isArray(thumbnails))) {
            return res.status(400).json({ msg: "Tipos de datos incorrectos" });
    }

    if (req.method === 'POST') {
        req.body.status = true; 
    }

    next();
}
