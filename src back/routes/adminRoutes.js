const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

router.get('/panel', authMiddleware, roleMiddleware(['superadmin']), adminController.getAdminPanel);

module.exports = router;