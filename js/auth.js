/* Autenticación con Supabase (correo + contraseña).
   El perfil básico (nombre, zona, intereses) se guarda en user_metadata al registrarse.
   Pendiente (preguntas a la PO): entrar con celular, invitado con cuenta, cuenta Stellar (nivel 1). */
var sb = null;
(function () {
  var c = window.COCHA_CONFIG || {};
  if (c.supabaseUrl && c.supabaseKey && window.supabase) sb = window.supabase.createClient(c.supabaseUrl, c.supabaseKey);
})();

function authOn() { return !!sb; }
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function authMsg(err) {
  var code = (err && (err.code || err.message)) || '';
  if (/invalid_credentials|Invalid login/i.test(code)) return 'Correo o contraseña incorrectos.';
  if (/user_already_exists|already registered/i.test(code)) return 'Ese correo ya tiene un perfil. Inicia sesión.';
  if (/email_not_confirmed|not confirmed/i.test(code)) return 'Confirma tu correo antes de entrar. Revisa tu bandeja.';
  if (/weak_password/i.test(code)) return 'Esa contraseña es muy débil. Prueba con otra.';
  if (/rate|too many/i.test(code)) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
  return 'No pudimos conectar. Revisa tu internet e inténtalo de nuevo.';
}

/* Copia el usuario de Supabase al estado de la app. */
function applyUser(user) {
  S.user = user ? { id: user.id, email: user.email } : null;
  if (!user) return;
  var m = user.user_metadata || {};
  if (m.name) S.prof.name = m.name;
  if (m.zona) S.prof.zona = m.zona;
  if (m.intereses && m.intereses.length) S.prof.ints = m.intereses.slice();
}

function authLogin(email, pass) {
  return sb.auth.signInWithPassword({ email: email, password: pass }).then(function (r) {
    if (r.error) throw r.error;
    applyUser(r.data.user);
    return r.data;
  });
}

/* Devuelve { session } si el proyecto no pide confirmar el correo; si lo pide, session es null. */
function authRegister(email, pass, prof) {
  return sb.auth.signUp({
    email: email,
    password: pass,
    options: { data: { name: prof.name, zona: prof.zona, intereses: prof.ints } }
  }).then(function (r) {
    if (r.error) throw r.error;
    if (r.data.session) applyUser(r.data.user);
    return r.data;
  });
}

function authLogout() {
  S.user = null;
  return sb ? sb.auth.signOut() : Promise.resolve();
}

/* Recupera la sesión guardada por Supabase al abrir la página. */
function authRestore() {
  if (!sb) return Promise.resolve(null);
  return sb.auth.getSession().then(function (r) {
    var u = r.data && r.data.session && r.data.session.user;
    applyUser(u || null);
    return u || null;
  }).catch(function () { return null; });
}
