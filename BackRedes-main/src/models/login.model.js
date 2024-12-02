const pool = require('../configs/db.config');

const findUserByEmail = async (correo) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { findUserByEmail };