// Funciones puras de validacion
 
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
 
const vacio = (v) => String(v ?? '').trim() === '';
const corto = (v, min) => String(v ?? '').trim().length < min;
 
// Cada validador devuelve un objeto si el objeto esta vacio, el formulario es valido
 
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
 
export function validarSolicitud(d, hoy) {
  const e = {};
  if (corto(d.empresa, 3)) e.empresa = 'Ingresa el nombre de tu empresa (minimo 3 caracteres).';
  if (corto(d.contacto, 3)) e.contacto = 'Ingresa el nombre de la persona de contacto.';
  if (!correoValido(d.correo)) e.correo = 'Ingresa un correo electronico valido.';
  if (!telefonoValido(d.telefono)) e.telefono = 'Ingresa un telefono valido (solo numeros, espacios y +).';
  if (vacio(d.tipoContrato)) e.tipoContrato = 'Selecciona el tipo de contrato requerido.';
  if (vacio(d.especialidad)) e.especialidad = 'Selecciona la especialidad que necesitas.';
 
  const cantidad = Number(d.cantidad);
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 50) e.cantidad = 'Ingresa un numero entero entre 1 y 50.';
 
  if (vacio(d.fechaInicio)) e.fechaInicio = 'Selecciona la fecha de inicio.';
  else if (hoy && d.fechaInicio < hoy) e.fechaInicio = 'La fecha de inicio no puede estar en el pasado.';
 
  if (vacio(d.fechaTermino)) e.fechaTermino = 'Selecciona la fecha de termino.';
  else if (!vacio(d.fechaInicio) && d.fechaTermino < d.fechaInicio) e.fechaTermino = 'La fecha de termino no puede ser anterior a la de inicio.';
 
  if (String(d.comentarios ?? '').length > 500) e.comentarios = 'Maximo 500 caracteres.';
  return e;
}
 
export function validarMarcaje({ rut, fecha, hora }) {
  const e = {};
  if (!validarRut(rut)) e.rut = 'Ingresa un RUT valido, con guion y digito verificador (Ej: 11.111.111-1).';
  if (vacio(fecha)) e.fecha = 'Selecciona la fecha del marcaje.';
  if (vacio(hora)) e.hora = 'Ingresa la hora del marcaje.';
  return e;
}
 
// rutsExistentes: RUTs de OTROS trabajadores (para detectar duplicados)
export function validarTrabajador(d, rutsExistentes = []) {
  const e = {};
  if (corto(d.nombre, 3)) e.nombre = 'Ingresa el nombre (minimo 3 caracteres).';
  if (!validarRut(d.rut)) e.rut = 'Ingresa un RUT valido, con guion y digito verificador.';
  else if (rutsExistentes.map(limpiarRut).includes(limpiarRut(d.rut))) e.rut = 'Ya existe un trabajador con este RUT.';
  if (vacio(d.especialidad)) e.especialidad = 'Selecciona una especialidad.';
  const valor = Number(d.valorHora);
  if (!Number.isFinite(valor) || valor < 1000) e.valorHora = 'Ingresa un valor hora valido (minimo $1.000).';
  if (vacio(d.estado)) e.estado = 'Selecciona el estado.';
  return e;
}
 
// otros: lista de OTROS usuarios (para detectar RUT o correo duplicados)
export function validarUsuario(d, otros = []) {
  const e = {};
  if (corto(d.nombre, 3)) e.nombre = 'Ingresa el nombre (minimo 3 caracteres).';
  if (!validarRut(d.rut)) e.rut = 'Ingresa un RUT valido, con guion y digito verificador.';
  else if (otros.some((u) => limpiarRut(u.rut) === limpiarRut(d.rut))) e.rut = 'Ya existe un usuario con este RUT.';
  if (!correoValido(d.correo) || !dominioValido(d.correo)) e.correo = 'Ingresa un correo @duoc.cl o @gmail.com.';
  else if (otros.some((u) => u.correo.toLowerCase() === d.correo.trim().toLowerCase())) e.correo = 'Ya existe un usuario con este correo.';
  if (!telefonoValido(d.telefono)) e.telefono = 'Ingresa un telefono valido (solo numeros, espacios y +).';
  if (vacio(d.rol)) e.rol = 'Selecciona un rol.';
  if (!passwordValida(d.password)) e.password = 'La contraseña debe tener entre 6 y 10 caracteres.';
  return e;
}

