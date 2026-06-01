const testimonialRepository = require('../repositories/testimonialRepository');

async function listTestimonials(user) {
  const testimonials = await testimonialRepository.findAll();

  if (user.rol === 'superadmin') return testimonials;

  return testimonials.filter(item => item.pais_id === user.pais_id);
}

async function createTestimonial(data, user) {
  const pais_id = user.rol === 'superadmin' ? data.pais_id : user.pais_id;

  return await testimonialRepository.create({
    pais_id,
    nombre: data.nombre,
    cargo: data.cargo || null,
    empresa: data.empresa || null,
    contenido: data.contenido,
    foto_url: data.foto_url,
    instagram_url: data.instagram_url || null,
    facebook_url: data.facebook_url || null,
    estado: data.estado || 'borrador',
    destacado: data.destacado || false,
    autor_id: user.id,
    fecha_publicacion: data.estado === 'publicado' ? new Date().toISOString() : null
  });
}

async function updateTestimonial(id, data) {
  const updateData = {
    ...data,
    updated_at: new Date().toISOString()
  };

  if (data.estado === 'publicado') {
    updateData.fecha_publicacion = new Date().toISOString();
  }

  return await testimonialRepository.update(id, updateData);
}

async function deleteTestimonial(id) {
  await testimonialRepository.remove(id);
  return { message: 'Testimonio eliminado correctamente' };
}

async function listPublicTestimonials(countrySlug) {
  return await testimonialRepository.findPublicByCountry(countrySlug);
}

module.exports = {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  listPublicTestimonials
};