const supabase = require('../config/supabase');

async function findAll() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*, paises(nombre, slug), usuarios(nombre, apellido)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

async function create(newsData) {
  const { data, error } = await supabase
    .from('noticias')
    .insert(newsData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function update(id, newsData) {
  const { data, error } = await supabase
    .from('noticias')
    .update(newsData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function remove(id) {
  const { error } = await supabase
    .from('noticias')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

async function findPublicByCountry(countrySlug) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*, paises!inner(nombre, slug)')
    .eq('estado', 'publicado')
    .eq('paises.slug', countrySlug)
    .order('fecha_publicacion', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

module.exports = { findAll, create, update, remove, findPublicByCountry };