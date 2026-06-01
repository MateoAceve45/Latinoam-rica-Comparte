const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/me', authMiddleware, profileController.getProfile);

module.exports = router;