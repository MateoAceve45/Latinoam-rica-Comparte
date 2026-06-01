const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

async function login({ username, password }) {
  const user = await authRepository.findByUsername(username);

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    throw new Error('Credenciales incorrectas');
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      rol: user.roles?.nombre,
      pais_id: user.pais_id
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return {
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      username: user.username,
      rol: user.roles?.nombre,
      pais: user.paises || null
    }
  };
}

module.exports = {
  login
};