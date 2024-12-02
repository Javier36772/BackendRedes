const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../models/login.model');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const isMatch = await bcrypt.compare(password, user.contrasena);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Si las credenciales son correctas, generar el token JWT
        const token = jwt.sign({ id: user.id, email: user.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Enviar el token y el ID del usuario en la respuesta
        return res.status(200).json({ message: 'Login exitoso', userId: user.id_usuario,token  });

    } catch (error) {
        console.error('Error al realizar el login:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };
