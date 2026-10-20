// Funciones de validacion
 
export function limpiarRut(rut) {
  return String(rut ?? '').replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
}
 
// Validacion de RUT chileno
export function validarRut(rutCompleto) {
  const rutLimpio = limpiarRut(rutCompleto);
  if (!/^[0-9]+[0-9K]$/.test(rutLimpio) || rutLimpio.length < 8) return false;
 
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
 
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
 
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  return dv === dvEsperado;
}
 
export function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(correo ?? '').trim());
}
 
export function dominioValido(correo) {
  const c = String(correo ?? '').trim().toLowerCase();
  return c.endsWith('@duoc.cl') || c.endsWith('@gmail.com');
}
 
export function passwordValida(password) {
  const largo = String(password ?? '').length;
  return largo >= 6 && largo <= 10;
}
 
export function telefonoValido(telefono) {
  return /^[+0-9 ]{8,15}$/.test(String(telefono ?? '').trim());
}
 
const corto = (v, min) => String(v ?? '').trim().length < min;
 
/* Cada validador devuelve un objeto { campo: 'mensaje' }.
Si el objeto esta vacio, el formulario es valido. */
 
export function validarLogin({ correo, rut, password }) {
  const e = {};
  if (!correoValido(correo) || !dominioValido(correo)) e.correo = 'Ingresa un correo @duoc.cl o @gmail.com.';
  if (!validarRut(rut)) e.rut = 'Ingresa un RUT valido, con guion y digito verificador.';
  if (!passwordValida(password)) e.password = 'La contraseña debe tener entre 6 y 10 caracteres.';
  return e;
}
 
export function validarRegistro({ nombre, empresa, rut, correo, telefono, password, confirmar }) {
  const e = {};
  if (corto(nombre, 3)) e.nombre = 'Ingresa tu nombre completo (minimo 3 caracteres).';
  if (corto(empresa, 3)) e.empresa = 'Ingresa el nombre de tu empresa (minimo 3 caracteres).';
  if (!validarRut(rut)) e.rut = 'Ingresa un RUT valido, con guion y digito verificador.';
  if (!correoValido(correo) || !dominioValido(correo)) e.correo = 'Ingresa un correo @duoc.cl o @gmail.com.';
  if (!telefonoValido(telefono)) e.telefono = 'Ingresa un telefono valido (solo numeros, espacios y +).';
  if (!passwordValida(password)) e.password = 'La contraseña debe tener entre 6 y 10 caracteres.';
  if (confirmar !== password) e.confirmar = 'Las contraseñas no coinciden.';
  return e;
}
