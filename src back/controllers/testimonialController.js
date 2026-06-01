const testimonialService = require('../services/testimonialService');

async function listTestimonials(req, res) {
  try {
    const testimonials = await testimonialService.listTestimonials(req.user);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createTestimonial(req, res) {
  try {
    const testimonial = await testimonialService.createTestimonial(req.body, req.user);
    res.status(201).json({
      message: 'Testimonio creado correctamente',
      testimonial
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateTestimonial(req, res) {
  try {
    const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
    res.json({
      message: 'Testimonio actualizado correctamente',
      testimonial
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteTestimonial(req, res) {
  try {
    const result = await testimonialService.deleteTestimonial(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listPublicTestimonials(req, res) {
  try {
    const testimonials = await testimonialService.listPublicTestimonials(req.params.countrySlug);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  listPublicTestimonials
};