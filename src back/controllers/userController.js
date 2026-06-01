const userService = require('../services/userService');

async function listUsers(req, res) {
  try {
    const users = await userService.listUsers();

    // quitar password_hash de todos
    const safeUsers = users.map(({ password_hash, ...user }) => user);

    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);

    // 👇 aquí quitamos el password_hash
    const { password_hash, ...safeUser } = user;

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: safeUser
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  listUsers,
  createUser
};