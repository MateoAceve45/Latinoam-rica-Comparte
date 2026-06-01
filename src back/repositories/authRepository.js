const supabase = require('../config/supabase');

async function findByUsername(username) {
  const { data, error } = await supabase
    .from('usuarios')
    .select(`
      *,
      roles (
        nombre
      ),
      paises (
        id,
        nombre,
        codigo,
        slug
      )
    `)
    .eq('username', username)
    .single();

  if (error) {
    return null;
  }

  return data;
}

module.exports = {
  findByUsername
};