require('dotenv').config();
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

async function createSuperAdmin() {
  const passwordHash = await bcrypt.hash('123456', 10);

  const { data: rol, error: rolError } = await supabase
    .from('roles')
    .select('id')
    .eq('nombre', 'superadmin')
    .single();

  if (rolError) {
    console.error('Error buscando rol superadmin:', rolError.message);
    return;
  }

  const { data, error } = await supabase
    .from('usuarios')
    .insert({
      nombre: 'Sergio',
      apellido: 'Puerto',
      email: 'sergio@demo.com',
      username: 'superadmin',
      password_hash: passwordHash,
      rol_id: rol.id,
      pais_id: null,
      estado: 'activo'
    })
    .select();

  if (error) {
    console.error('Error creando superadmin:', error.message);
    return;
  }

  console.log('Superadmin creado correctamente:', data);
}

createSuperAdmin();