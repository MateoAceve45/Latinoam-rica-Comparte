const supabase = require('../config/supabase');

async function findAll() {
  const { data, error } = await supabase
    .from('solicitudes_contacto')
    .select('*, paises(nombre, slug), usuarios(nombre, apellido)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

async function create(dataRequest) {
  const { data, error } = await supabase
    .from('solicitudes_contacto')
    .insert(dataRequest)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function updateStatus(id, dataRequest) {
  const { data, error } = await supabase
    .from('solicitudes_contacto')
    .update(dataRequest)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

async function remove(id) {
  const { error } = await supabase
    .from('solicitudes_contacto')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

module.exports = {
  findAll,
  create,
  updateStatus,
  remove
};