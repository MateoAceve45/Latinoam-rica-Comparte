function getAdminPanel(req, res) {
  res.json({
    message: 'Bienvenido al panel administrativo',
    user: req.user
  });
}

module.exports = {
  getAdminPanel
};