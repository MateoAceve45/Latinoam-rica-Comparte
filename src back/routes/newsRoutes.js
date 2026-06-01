const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const newsController = require('../controllers/newsController');

router.get('/public/:countrySlug', newsController.listPublicNews);

router.get(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  newsController.listNews
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  newsController.createNews
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  newsController.updateNews
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais']),
  newsController.deleteNews
);

module.exports = router;