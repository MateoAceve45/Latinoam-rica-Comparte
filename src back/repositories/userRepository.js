const supabase = require('../config/supabase');

async function findAll() {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      id,
      nombre,
      apellido,
      email,
      username,
      estado,
      rol_id,
      pais_id,
      created_at,
      roles(nombre),
      paises(nombre, codigo, slug)
    `)
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

async function create(userData) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert(userData)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

module.exports = {
  findAll,
  create
};