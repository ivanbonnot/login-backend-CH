const productoModel = require("../models/productoModel")

class ControllerMongoDb {

    saveProduct = async (productToAdd) => {
        const product = new productoModel(productToAdd);
        await product.save();
        console.log("guardado", product)
    };

    getAll = async () => await productoModel.find({});

    getProductById = async (id) => await productoModel.findOne({ _id: id });

    updateProduct = async (id, productToUpdate) => {
        return await productoModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

    deleteProduct = async (id) => await productoModel.deleteOne({ _id: id });
}


const productController = new ControllerMongoDb()
module.exports = productController;