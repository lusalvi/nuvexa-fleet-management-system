const supabase = require('../supabaseClient');
const prefix = process.env.SUPABASE_PREFIX || '';

async function obtenerConductores() {
  const { data, error } = await supabase
    .from(`${prefix}conductores`)
    .select('*, vehiculo(patente)');

  if (error) throw new Error(error.message);
  return data;
}

module.exports = { obtenerConductores };
