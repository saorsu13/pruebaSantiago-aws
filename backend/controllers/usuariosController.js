if (!global.jwt) {
  global.jwt = require('jsonwebtoken');
}const bcrypt = require('bcrypt');
const pool = require('../db/db');

const crearUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const jwt = require('jsonwebtoken');

const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0 || !(await bcrypt.compare(password, user.rows[0].password))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email }, 'tu_secreto_secreto', {
      expiresIn: '1h',
    });

    await pool.query('INSERT INTO sessions (user_id, token, expiration_timestamp) VALUES ($1, $2, NOW() + INTERVAL \'1 hour\')', [user.rows[0].id, token]);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
const cerrarSesion = async (req, res) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'No se proporcionó un token de autorización' });
    }
    const result = await pool.query('DELETE FROM sessions WHERE token = $1', [token]);

    if (result.rowCount === 0) {
      return res.status(401).json({ error: 'Token no válido o ya ha sido eliminado' });
    }
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  iniciarSesion,
  crearUsuario,
  cerrarSesion
};