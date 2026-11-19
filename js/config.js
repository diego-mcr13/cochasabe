/* Configuración pública de Supabase.
   La clave "publishable" (o "anon") es pública por diseño: lo que protege los datos son las
   políticas RLS de la base. Nunca pongas aquí la clave secreta ni la service_role.
   Si los dos valores quedan vacíos, la app corre en modo demo (sin Supabase, como el prototipo). */
var COCHA_CONFIG = {
  supabaseUrl: '',
  supabaseKey: ''
};
