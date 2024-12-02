const { createUser, getUsers, getUserById, updateUserById, deleteUserById } = require('../models/users.model');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const createNewUser = async (req, res) => {
    const { email, password, nombre } = req.body;

    if (!email || !password || !nombre) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        contraseña: hashedPassword,
        nombre
    };

    try {
        const user = await createUser(newUser);
        return res.status(201).json({ message: 'Usuario creado con éxito', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener usuario por ID
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Actualizar usuario por ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, contraseña, nombre } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const updatedUser = {
        email,
        contraseña: hashedPassword,
        nombre
    };

    try {
        const user = await updateUserById(id, updatedUser);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario actualizado', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar usuario por ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await deleteUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario eliminado', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

module.exports = { createNewUser, getAllUsers, getUser, updateUser, deleteUser };
