const supabase = require('../supabaseClient');
const prefix = process.env.SUPABASE_PREFIX || '';

async function obtenerPasajeros() {
  const { data, error } = await supabase
    .from(`${prefix}pasajeros`)
    .select('*');

  if (error) throw new Error(error.message);
  return data;
}

module.exports = { obtenerPasajeros };
