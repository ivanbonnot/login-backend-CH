const { Router } = require("express")
const Product = require("../../Class/Product")
const productController = require("../../controllers/productMongoDB")

const productsRouter = Router();

const adm = true

productsRouter.get('/', async (req, res) => {
    const productos = await productController.getProducts();

    res.json(productos);
})


productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const productById = await productController.getProductById(id)
    console.log(id)
    if (productById) {
        res.json(productById)
    } else {
        res.status(404).send({ error: 'Product not found' })
    }
})


productsRouter.post('/', async (req, res) => {
    if (adm) {
        const { title, description, code, thumbnail, price, stock } = req.body;

        const product = new Product(
            title,
            description,
            code,
            thumbnail,
            price,
            stock
        );

        productController.saveProduct(product)
        res.json('Guardado')

    } else {
        res.send('Error: 403 Ruta: "api/productos" Método: "POST" No Autorizada ')
    }
})


productsRouter.put('/:id', async (req, res) => {
    if (adm) {
        const { id } = req.params
        const { title, description, code, thumbnail, price, stock } = req.body;

        const productUpdate = new Product(
            title,
            description,
            code,
            thumbnail,
            price,
            stock
        );

        const productById = await productController.getProductById(id)

        if (productById) {
            await productController.updateProduct(id, productUpdate)
            res.send(productUpdate)
        } else {
            res.status(404).send({ error: 'id invalid / missing fields' })
        }
    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "PUT" No Autorizada ')
    }
})


productsRouter.delete('/:id', async (req, res) => {
    if (adm) {
        const { id } = req.params
        const deleteProdById = await productController.deleteProduct(id)

        if (deleteProdById) {
            res.send({ deleted: deleteProdById })
        } else {
            res.status(404).send({ error: 'Product not found' })
        }

    } else {
        res.send('Error: 403 Ruta: "api/productos/:Id" Método: "DELETE" No Autorizada ')
    }

})




module.exports = productsRouter;

