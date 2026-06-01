const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const countryController = require('../controllers/countryController');

router.get('/', authMiddleware, countryController.listCountries);
router.get('/active', authMiddleware, countryController.listActiveCountries);

module.exports = router;