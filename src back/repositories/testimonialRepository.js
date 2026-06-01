const supabase = require('../config/supabase');

async function findAll() {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*, paises(nombre, slug), usuarios(nombre, apellido)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

async function create(testimonialData) {
  const { data, error } = await supabase
    .from('testimonios')
    .insert(testimonialData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function update(id, testimonialData) {
  const { data, error } = await supabase
    .from('testimonios')
    .update(testimonialData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function remove(id) {
  const { error } = await supabase
    .from('testimonios')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

async function findPublicByCountry(countrySlug) {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*, paises!inner(nombre, slug)')
    .eq('estado', 'publicado')
    .eq('paises.slug', countrySlug)
    .order('fecha_publicacion', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

module.exports = {
  findAll,
  create,
  update,
  remove,
  findPublicByCountry
};