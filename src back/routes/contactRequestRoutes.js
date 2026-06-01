const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const contactRequestController = require('../controllers/contactRequestController');

// 🔓 Público (formulario web)
router.post('/public', contactRequestController.createRequest);

// 🔒 Admin
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais']),
  contactRequestController.listRequests
);

router.put(
  '/:id/status',
  authMiddleware,
  roleMiddleware(['superadmin', 'admin_pais']),
  contactRequestController.updateRequestStatus
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['superadmin']),
  contactRequestController.deleteRequest
);

module.exports = router;