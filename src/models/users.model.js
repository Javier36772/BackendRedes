    const pool = require('../configs/db.config');

    // Crear usuario
    const createUser = async (user) => {
        const { email, contraseña, nombre } = user;
        const [result] = await pool.query(
            'INSERT INTO usuarios (correo, contraseña, nombre) VALUES (?, ?, ?)',
            [email, contraseña, nombre]
        );
        return { id: result.insertId, email, nombre };  // Devolvemos el nuevo usuario con su ID asignado por la BD
    };

    // Obtener todos los usuarios
    const getUsers = async () => {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    };

    // Obtener usuario por ID
    const getUserById = async (id) => {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    };

    // Actualizar usuario por ID
    const updateUserById = async (id, updatedData) => {
        const { email, contraseña, nombre } = updatedData;
        await pool.query(
            'UPDATE usuarios SET correo = ?, contraseña = ?, nombre = ? WHERE id_usuario = ?',
            [email, contraseña, nombre, id]
        );
        return getUserById(id);  // Devolvemos el usuario actualizado
    };

    // Eliminar usuario por ID
    const deleteUserById = async (id) => {
        const userToDelete = await getUserById(id);
        if (!userToDelete) {
            return null;  // Si no se encuentra el usuario, retornamos null
        }
        await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        return userToDelete;  // Retornamos el usuario eliminado
    };

    module.exports = { createUser, getUsers, getUserById, updateUserById, deleteUserById };
