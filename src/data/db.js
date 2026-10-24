// Base de datos simulada + funciones CRUD.
 
// Constantes y datos iniciales 
export const ROLES = {
  ADMIN: 'Administrador',
  RRHH: 'Jefe de RR.HH.',
  COORDINADOR: 'Coordinador',
  RECLUTADOR: 'Reclutador',
  CLIENTE: 'Cliente',
  TRABAJADOR: 'Trabajador',
};
 
export const TIPOS_CONTRATO = [
  { codigo: 'CT001', nombre: 'Eventual', descripcion: 'Contrato por obra o servicio especifico.', duracion: 'Hasta 3 meses', beneficios: 'Sin beneficios' },
  { codigo: 'CT002', nombre: 'Plazo fijo', descripcion: 'Contrato por tiempo determinado.', duracion: '3 a 12 meses', beneficios: 'Seguro de salud' },
  { codigo: 'CT003', nombre: 'Indefinido', descripcion: 'Contrato por tiempo indefinido.', duracion: 'Indefinido', beneficios: 'Seguro de salud + vacaciones pagadas' },
  { codigo: 'CT004', nombre: 'Honorarios', descripcion: 'Contrato de prestacion de servicios.', duracion: 'Por proyecto', beneficios: 'Sin beneficios' },
];
 
export const ESTADOS_SOLICITUD = ['Solicitado', 'En seleccion', 'Asignado', 'En servicio', 'Finalizado'];
 
export const DESCRIPCION_ESTADO = {
  'Solicitado': 'Hemos recibido tu solicitud de personal y estamos buscando perfiles.',
  'En seleccion': 'Estamos evaluando a los candidatos disponibles para tu solicitud.',
  'Asignado': 'Hemos asignado personal a tu solicitud.',
  'En servicio': 'Los trabajadores estan cumpliendo con el servicio en tu empresa.',
  'Finalizado': 'El servicio ha finalizado correctamente.',
};
 
export const SEED = {
  usuarios: [
    { id: 1, nombre: 'Juan Carlos', rut: '12.345.678-5', correo: 'admin.staffpro@gmail.com', telefono: '+56 9 1111 1111', password: 'admin123', rol: ROLES.ADMIN, empresa: '' },
    { id: 2, nombre: 'Sofia Herrera', rut: '23.456.789-6', correo: 'rrhh.staffpro@gmail.com', telefono: '+56 9 2222 2222', password: 'rrhh1234', rol: ROLES.RRHH, empresa: '' },
    { id: 3, nombre: 'Matias Fuentes', rut: '18.765.432-7', correo: 'coord.staffpro@gmail.com', telefono: '+56 9 3333 3333', password: 'coord123', rol: ROLES.COORDINADOR, empresa: '' },
    { id: 4, nombre: 'Javiera Nuñez', rut: '15.234.567-4', correo: 'recluta.staffpro@gmail.com', telefono: '+56 9 4444 4444', password: 'recluta12', rol: ROLES.RECLUTADOR, empresa: '' },
    { id: 5, nombre: 'Camila Reyes', rut: '17.654.321-3', correo: 'camila.reyes@gmail.com', telefono: '+56 9 5555 5555', password: 'cliente12', rol: ROLES.CLIENTE, empresa: 'Construccion SA' },
    { id: 6, nombre: 'Juan Perez', rut: '11.111.111-1', correo: 'juan.perez@gmail.com', telefono: '+56 9 6666 6666', password: 'trabajo12', rol: ROLES.TRABAJADOR, empresa: '' },
  ],
  trabajadores: [
    { id: 1, rut: '11.111.111-1', nombre: 'Juan Perez', especialidad: 'Operador de grua', valorHora: 12000, cliente: 'Construccion SA', estado: 'En turno' },
    { id: 2, rut: '22.222.222-2', nombre: 'Maria Gonzalez', especialidad: 'Bodeguero/a', valorHora: 8500, cliente: 'Retail Center', estado: 'En turno' },
    { id: 3, rut: '33.333.333-3', nombre: 'Carlos Silva', especialidad: 'Electricista', valorHora: 14000, cliente: 'Sin asignar', estado: 'Disponible' },
    { id: 4, rut: '44.444.444-4', nombre: 'Ana Rojas', especialidad: 'Ayudante de produccion', valorHora: 6500, cliente: 'Industrial Sur', estado: 'En turno' },
    { id: 5, rut: '55.555.555-5', nombre: 'Luis Muñoz', especialidad: 'Conductor', valorHora: 11000, cliente: 'Sin asignar', estado: 'Disponible' },
    { id: 6, rut: '66.666.666-6', nombre: 'Pedro Soto', especialidad: 'Operador de grua', valorHora: 12500, cliente: 'Sin asignar', estado: 'Disponible' },
    { id: 7, rut: '77.777.777-7', nombre: 'Daniela Vega', especialidad: 'Bodeguero/a', valorHora: 8800, cliente: 'Sin asignar', estado: 'Disponible' },
    { id: 8, rut: '88.888.888-8', nombre: 'Marcelo Diaz', especialidad: 'Electricista', valorHora: 13500, cliente: 'Construccion SA', estado: 'En turno' },
  ],
  solicitudes: [
    { id: 1, usuarioId: 5, empresa: 'Construccion SA', contacto: 'Camila Reyes', correo: 'camila.reyes@gmail.com', telefono: '+56 9 5555 5555', tipoContrato: 'CT002', especialidad: 'Operador de grua', cantidad: 1, fechaInicio: '2026-10-01', fechaTermino: '2026-12-15', comentarios: 'Faena en Santiago Centro.', estado: 'En servicio', fechaCreacion: '2026-09-20' },
    { id: 2, usuarioId: 5, empresa: 'Construccion SA', contacto: 'Camila Reyes', correo: 'camila.reyes@gmail.com', telefono: '+56 9 5555 5555', tipoContrato: 'CT001', especialidad: 'Electricista', cantidad: 1, fechaInicio: '2026-10-05', fechaTermino: '2026-11-30', comentarios: '', estado: 'En servicio', fechaCreacion: '2026-09-25' },
    { id: 3, usuarioId: 5, empresa: 'Construccion SA', contacto: 'Camila Reyes', correo: 'camila.reyes@gmail.com', telefono: '+56 9 5555 5555', tipoContrato: 'CT001', especialidad: 'Conductor', cantidad: 2, fechaInicio: '2026-11-02', fechaTermino: '2026-12-20', comentarios: 'Turno de mañana.', estado: 'Solicitado', fechaCreacion: '2026-10-15' },
  ],
  asistencias: [
    { id: 1, rut: '11.111.111-1', fecha: '2026-10-14', hora: '08:00', tipo: 'Entrada' },
    { id: 2, rut: '11.111.111-1', fecha: '2026-10-14', hora: '17:00', tipo: 'Salida' },
    { id: 3, rut: '11.111.111-1', fecha: '2026-10-15', hora: '08:05', tipo: 'Entrada' },
    { id: 4, rut: '11.111.111-1', fecha: '2026-10-15', hora: '17:10', tipo: 'Salida' },
    { id: 5, rut: '22.222.222-2', fecha: '2026-10-15', hora: '09:00', tipo: 'Entrada' },
    { id: 6, rut: '22.222.222-2', fecha: '2026-10-15', hora: '18:00', tipo: 'Salida' },
    { id: 7, rut: '44.444.444-4', fecha: '2026-10-15', hora: '07:55', tipo: 'Entrada' },
    { id: 8, rut: '44.444.444-4', fecha: '2026-10-15', hora: '16:30', tipo: 'Salida' },
  ],
};
 
//Base de datos simulada y CRUD
 
const copiaInicial = () => JSON.parse(JSON.stringify(SEED));
 
let db = copiaInicial();
 
const siguienteId = (lista) => lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
 
// CRUD generico 

// READ (todos)
export function listar(coleccion) {
  return db[coleccion] ?? [];
}
 
// READ (uno)
export function obtener(coleccion, id) {
  return listar(coleccion).find((item) => String(item.id) === String(id)) ?? null;
}
 
// CREATE
export function crear(coleccion, datos) {
  const lista = listar(coleccion);
  const nuevo = { ...datos, id: siguienteId(lista) };
  db = { ...db, [coleccion]: [...lista, nuevo] };
  return nuevo;
}
 
// UPDATE
export function actualizar(coleccion, id, cambios) {
  const lista = listar(coleccion);
  const indice = lista.findIndex((item) => String(item.id) === String(id));
  if (indice === -1) return null;
  const actualizado = { ...lista[indice], ...cambios, id: lista[indice].id };
  db = { ...db, [coleccion]: lista.map((item, i) => (i === indice ? actualizado : item)) };
  return actualizado;
}
 
// DELETE
export function eliminar(coleccion, id) {
  const lista = listar(coleccion);
  const restantes = lista.filter((item) => String(item.id) !== String(id));
  if (restantes.length === lista.length) return false;
  db = { ...db, [coleccion]: restantes };
  return true;
}
 
// Vuelve a los datos iniciales (util para pruebas)
export function reiniciarDatos() {
  db = copiaInicial();
}

