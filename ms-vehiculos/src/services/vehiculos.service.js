const supabase = require('../../supabaseClient');
const prefix = process.env.SUPABASE_PREFIX || '';

async function obtenerVehiculos() {
  const { data, error } = await supabase
    .from(`${prefix}vehiculos`)
    .select('*');

  if (error) throw new Error(error.message);
  return data;
}

async function buscarVehiculosPorPatente(patente) {
  const { data, error } = await supabase
    .from(`${prefix}vehiculos`)
    .select('*')
    .ilike('patente', `%${patente}%`);

  if (error) throw new Error(error.message);
  return data;
}

module.exports = {
  obtenerVehiculos,
  buscarVehiculosPorPatente
};
