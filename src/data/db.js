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
 
export const SEED = {
  usuarios: [
    { id: 1, nombre: 'Valentina Morales', rut: '12.345.678-5', correo: 'admin.staffpro@gmail.com', telefono: '+56 9 1111 1111', password: 'admin123', rol: ROLES.ADMIN, empresa: '' },
    { id: 2, nombre: 'Sofia Herrera', rut: '23.456.789-6', correo: 'rrhh.staffpro@gmail.com', telefono: '+56 9 2222 2222', password: 'rrhh1234', rol: ROLES.RRHH, empresa: '' },
    { id: 3, nombre: 'Matias Fuentes', rut: '18.765.432-7', correo: 'coord.staffpro@gmail.com', telefono: '+56 9 3333 3333', password: 'coord123', rol: ROLES.COORDINADOR, empresa: '' },
    { id: 4, nombre: 'Javiera Nuñez', rut: '15.234.567-4', correo: 'recluta.staffpro@gmail.com', telefono: '+56 9 4444 4444', password: 'recluta12', rol: ROLES.RECLUTADOR, empresa: '' },
    { id: 5, nombre: 'Camila Reyes', rut: '17.654.321-3', correo: 'camila.reyes@gmail.com', telefono: '+56 9 5555 5555', password: 'cliente12', rol: ROLES.CLIENTE, empresa: 'Construccion SA' },
    { id: 6, nombre: 'Juan Perez', rut: '11.111.111-1', correo: 'juan.perez@gmail.com', telefono: '+56 9 6666 6666', password: 'trabajo12', rol: ROLES.TRABAJADOR, empresa: '' },
  ],
};
 
// Base de datos simulada y CRUD
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
 
// Vuelve a los datos iniciales
export function reiniciarDatos() {
  db = copiaInicial();
}
