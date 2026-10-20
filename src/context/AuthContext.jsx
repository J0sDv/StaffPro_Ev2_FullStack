import { createContext, useContext, useState } from 'react';
import { listar } from '../data/db';
import { limpiarRut } from '../utils/validaciones';
 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
 
  const iniciarSesion = (usuarioNuevo) => {
    // Nunca se guarda la contraseña en la sesion
    const { password: _password, ...sesion } = usuarioNuevo;
    setUsuario(sesion);
    return sesion;
  };
 
  // Autenticacion contra la "base de datos" simulada
  const login = ({ correo, rut, password }) => {
    const encontrado = listar('usuarios').find(
      (u) =>
        u.correo.toLowerCase() === correo.trim().toLowerCase() &&
        limpiarRut(u.rut) === limpiarRut(rut) &&
        u.password === password
    );
    if (!encontrado) return { ok: false, error: 'Credenciales incorrectas. Verifica tu correo, RUT y contraseña.' };
    return { ok: true, usuario: iniciarSesion(encontrado) };
  };
 
  const logout = () => {
    setUsuario(null);
  };
 
  return (
    <AuthContext.Provider value={{ usuario, login, logout, iniciarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
