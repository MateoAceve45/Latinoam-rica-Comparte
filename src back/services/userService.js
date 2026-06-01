const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

async function listUsers() {
  return await userRepository.findAll();
}

async function createUser(data) {
  const password_hash = await bcrypt.hash(data.password, 10);

  const userData = {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    username: data.username,
    password_hash,
    rol_id: data.rol_id,
    pais_id: data.pais_id || null,
    estado: data.estado || 'activo'
  };

  return await userRepository.create(userData);
}

module.exports = {
  listUsers,
  createUser
};