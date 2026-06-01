const newsRepository = require('../repositories/newsRepository');

function slugify(text) {
  if (!text) return '';

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function listNews(user) {
  const news = await newsRepository.findAll();

  if (user.rol === 'superadmin') return news;

  return news.filter(item => item.pais_id === user.pais_id);
}

async function createNews(data, user) {
  if (!data.titulo) {
    throw new Error('El título es obligatorio');
  }

  const pais_id = user.rol === 'superadmin' ? data.pais_id : user.pais_id;

  return await newsRepository.create({
    pais_id,
    titulo: data.titulo,
    slug: slugify(data.titulo),
    resumen: data.resumen,
    contenido: data.contenido,
    imagen_principal_url: data.imagen_principal_url || null,
    autor_id: user.id,
    estado: data.estado || 'borrador',
    fecha_publicacion: data.estado === 'publicado'
      ? new Date().toISOString()
      : null
  });
}

async function updateNews(id, data) {
  const updateData = {
    ...data,
    updated_at: new Date().toISOString()
  };

  if (data.titulo) {
    updateData.slug = slugify(data.titulo);
  }

  if (data.estado === 'publicado') {
    updateData.fecha_publicacion = new Date().toISOString();
  }

  return await newsRepository.update(id, updateData);
}

async function deleteNews(id) {
  await newsRepository.remove(id);
  return { message: 'Noticia eliminada correctamente' };
}

async function listPublicNews(countrySlug) {
  return await newsRepository.findPublicByCountry(countrySlug);
}

module.exports = {
  listNews,
  createNews,
  updateNews,
  deleteNews,
  listPublicNews
};