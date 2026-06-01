const supabase = require('../config/supabase');

async function findAll() {
  const { data, error } = await supabase
    .from('paises')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

async function findActive() {
  const { data, error } = await supabase
    .from('paises')
    .select('*')
    .eq('estado', 'activo')
    .order('nombre', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

module.exports = {
  findAll,
  findActive
};