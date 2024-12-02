const { createProduct, getProducts, getProductById, updateProductById, deleteProductById } = require('../models/productos.model');


const createNewProduct = async (req, res) => {
    const { nombre, precio, descripcion } = req.body;

    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newProduct = { nombre, precio, descripcion };

    try {
        const product = await createProduct(newProduct);
        return res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};


const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;

    const updatedProduct = { nombre, precio, descripcion };

    try {
        const product = await updateProductById(id, updatedProduct);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto actualizado', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await deleteProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado', product });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = { createNewProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
