const contactRequestService = require('../services/contactRequestService');

async function listRequests(req, res) {
  try {
    const requests = await contactRequestService.listRequests(req.user);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createRequest(req, res) {
  try {
    const request = await contactRequestService.createRequest(req.body);
    res.status(201).json({
      message: 'Solicitud creada correctamente',
      request
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateRequestStatus(req, res) {
  try {
    const request = await contactRequestService.updateRequestStatus(
      req.params.id,
      req.body,
      req.user
    );

    res.json({
      message: 'Solicitud actualizada correctamente',
      request
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteRequest(req, res) {
  try {
    const result = await contactRequestService.deleteRequest(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  listRequests,
  createRequest,
  updateRequestStatus,
  deleteRequest
};