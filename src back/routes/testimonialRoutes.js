const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const testimonialController = require('../controllers/testimonialController');

// públicas
router.get('/public/:countrySlug', testimonialController.listPublicTestimonials);

// protegidas
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  testimonialController.listTestimonials
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  testimonialController.createTestimonial
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais', 'editor']),
  testimonialController.updateTestimonial
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais']),
  testimonialController.deleteTestimonial
);

module.exports = router;