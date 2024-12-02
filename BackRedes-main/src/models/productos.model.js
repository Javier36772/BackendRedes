const pool = require('../configs/db.config');

// Crear producto
const createProduct = async (product) => {
    const { nombre, precio, descripcion } = product;
    const [result] = await pool.query(
        'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)',
        [nombre, precio, descripcion]
    );
    return { id: result.insertId, nombre, precio, descripcion };
};

// Obtener todos los productos
const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};

// Obtener producto por ID
const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Actualizar producto por ID
const updateProductById = async (id, updatedData) => {
    const { nombre, precio, descripcion } = updatedData;
    await pool.query(
        'UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id_producto = ?',
        [nombre, precio, descripcion, id]
    );
    return getProductById(id);
};

// Eliminar producto por ID
const deleteProductById = async (id) => {
    const productToDelete = await getProductById(id);
    if (!productToDelete) {
        return null;
    }
    await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    return productToDelete;
};

module.exports = { createProduct, getProducts, getProductById, updateProductById, deleteProductById };
