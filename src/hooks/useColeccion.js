import { useCallback, useState } from 'react';
import { listar, crear, actualizar, eliminar } from '../data/db';
 
// Conecta una coleccion de la base de datos con el estado de React.
// Cada operacion modifica los datos en db.js y vuelve a leer la lista para refrescar la interfaz.
export default function useColeccion(coleccion) {
  const [datos, setDatos] = useState(() => listar(coleccion));
 
  const recargar = useCallback(() => setDatos(listar(coleccion)), [coleccion]);
 
  const agregar = useCallback((item) => {
    const nuevo = crear(coleccion, item);
    recargar();
    return nuevo;
  }, [coleccion, recargar]);
 
  const modificar = useCallback((id, cambios) => {
    const resultado = actualizar(coleccion, id, cambios);
    recargar();
    return resultado;
  }, [coleccion, recargar]);
 
  const quitar = useCallback((id) => {
    const ok = eliminar(coleccion, id);
    recargar();
    return ok;
  }, [coleccion, recargar]);
 
  return { datos, agregar, modificar, quitar, recargar };
}
