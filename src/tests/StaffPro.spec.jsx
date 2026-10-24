import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../components/Login';
import { TablaTrabajadores } from '../components/TablaTrabajadores';
import { MarcajeAsistencia } from '../components/MarcajeAsistencia';
import { BotonAccion } from '../components/BotonAccion';
import { AlertaMensaje } from '../components/AlertaMensaje';
import { validarRutChileno } from '../utils/validaciones';
import * as dbService from '../data/db';

describe('Pruebas Unitarias del Sistema StaffPro - Jasmine & Karma', () => {

  // TEST 1: Renderizado básico
  it('1. Debe renderizar el formulario de Login con los campos de RUT y Contraseña', () => {
    render(<Login />);
    expect(screen.getByLabelText(/RUT/i)).toBeTruthy();
    expect(screen.getByLabelText(/Contraseña/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeTruthy();
  });

  // TEST 2: Renderizado condicional
  it('2. Debe mostrar la alerta de error solo cuando la prop "mensaje" tenga contenido', () => {
    const { rerender } = render(<AlertaMensaje mensaje="" tipo="danger" />);
    expect(screen.queryByRole('alert')).toBeNull();

    rerender(<AlertaMensaje mensaje="Credenciales inválidas" tipo="danger" />);
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('Credenciales inválidas')).toBeTruthy();
  });

  // TEST 3: Manejo y recepción de Props
  it('3. Debe recibir la etiqueta personalizada y la función onClick mediante Props', () => {
    const handleClickSpy = jasmine.createSpy('handleClick');
    render(<BotonAccion texto="Asignar Personal" onClick={handleClickSpy} />);
    
    const boton = screen.getByRole('button', { name: /Asignar Personal/i });
    expect(boton).toBeTruthy();
    
    fireEvent.click(boton);
    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });

  // TEST 4: Gestión de Estado (State) en Formularios
  it('4. Debe actualizar el estado local cuando el usuario escribe en el campo RUT', () => {
    render(<Login />);
    const inputRut = screen.getByLabelText(/RUT/i);
    
    fireEvent.change(inputRut, { target: { value: '19.876.543-2' } });
    expect(inputRut.value).toBe('19.876.543-2');
  });

  // TEST 5: Simulación de Eventos y Manipulación del DOM
  it('5. Debe ejecutar el registro de marca de entrada al hacer clic en el botón', () => {
    const onMarcarEntradaSpy = jasmine.createSpy('onMarcarEntrada');
    render(<MarcajeAsistencia onMarcar={onMarcarEntradaSpy} />);
    
    const btnEntrada = screen.getByRole('button', { name: /Marcar Entrada/i });
    fireEvent.click(btnEntrada);
    
    expect(onMarcarEntradaSpy).toHaveBeenCalledWith('ENTRADA');
  });

  // TEST 6: Lógica Algorítmica (Validación Módulo 11 de RUT)
  it('6. Debe validar correctamente la estructura y el dígito verificador del RUT chileno', () => {
    expect(validarRutChileno('12.345.678-5')).toBe(true);
    expect(validarRutChileno('123456785')).toBe(true);
    expect(validarRutChileno('12.345.678-0')).toBe(false); // DV incorrecto
  });

  // TEST 7: Uso de Mocks para capa de datos (Mock Store)
  it('7. Debe utilizar un Mock para simular la obtención de trabajadores desde db.js', () => {
    const listaMock = [
      { id: 1, nombre: 'Juan Pérez', especialidad: 'Operario' },
      { id: 2, nombre: 'María Soto', especialidad: 'Coordinador' }
    ];
    
    spyOn(dbService, 'obtenerTrabajadores').and.returnValue(listaMock);
    
    const resultado = dbService.obtenerTrabajadores();
    expect(dbService.obtenerTrabajadores).toHaveBeenCalled();
    expect(resultado.length).toBe(2);
    expect(resultado[0].nombre).toBe('Juan Pérez');
  });

  // TEST 8: Renderizado de Listado de Datos
  it('8. Debe renderizar en la tabla la cantidad exacta de trabajadores recibidos', () => {
    const trabajadoresMock = [
      { id: 1, rut: '11.111.111-1', nombre: 'Carlos', especialidad: 'Eléctrico' },
      { id: 2, rut: '22.222.222-2', nombre: 'Ana', especialidad: 'Mecánico' }
    ];
    
    render(<TablaTrabajadores trabajadores={trabajadoresMock} />);
    const filas = screen.getAllByTestId('fila-trabajador');
    expect(filas.length).toBe(2);
  });

  // TEST 9: Filtrado dinámico de elementos
  it('9. Debe filtrar la lista visualizada al cambiar la especialidad seleccionada', () => {
    const trabajadoresMock = [
      { id: 1, nombre: 'Pedro', especialidad: 'Seguridad' },
      { id: 2, nombre: 'Lucía', especialidad: 'Aseo' }
    ];
    
    render(<TablaTrabajadores trabajadores={trabajadoresMock} />);
    const selectFiltro = screen.getByLabelText(/Filtrar por Especialidad/i);
    
    fireEvent.change(selectFiltro, { target: { value: 'Seguridad' } });
    expect(screen.getByText('Pedro')).toBeTruthy();
    expect(screen.queryByText('Lucía')).toBeNull();
  });

  // TEST 10: Cambio de Estado de Solicitud en Mock CRUD
  it('10. Debe simular el cambio de estado de una solicitud a "ASIGNADO"', () => {
    spyOn(dbService, 'actualizarEstadoSolicitud').and.returnValue({ success: true });
    
    const resultado = dbService.actualizarEstadoSolicitud(101, 'ASIGNADO');
    expect(dbService.actualizarEstadoSolicitud).toHaveBeenCalledWith(101, 'ASIGNADO');
    expect(resultado.success).toBe(true);
  });

});