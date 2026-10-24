import { useState } from 'react';
 
// Hook personalizado: maneja valores, errores y envio de un formulario controlado.
export default function useFormulario(inicial, validar) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };
 
  const handleSubmit = (onValido) => (e) => {
    e.preventDefault();
    const errs = validar(datos);
    setErrores(errs);
    if (Object.keys(errs).length === 0) onValido(datos);
  };
 
  const reset = (nuevos = inicial) => {
    setDatos(nuevos);
    setErrores({});
  };
 
  return { datos, setDatos, errores, handleChange, handleSubmit, reset };
}
