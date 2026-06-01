const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

router.get(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin']),
  userController.listUsers
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin']),
  userController.createUser
);

module.exports = router;