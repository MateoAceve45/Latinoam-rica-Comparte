function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ message: 'No tienes permisos' });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'Acceso denegado por rol' });
    }

    next();
  };
}

module.exports = roleMiddleware;