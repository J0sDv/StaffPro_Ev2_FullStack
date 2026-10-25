# StaffPro

Plataforma web de gestion de personal externo.
Proyecto de la asignatura DSY1104_002D - Evaluacion Parcial 2.

## Tecnologias

- React 19 + Vite
- React Bootstrap + Bootstrap + Bootstrap Icons
- React Router
- Vitest + Testing Library (pruebas unitarias)

## Como ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abre http://localhost:5173 en el navegador.

## Pruebas unitarias

```bash
npm run test:run   # ejecuta las 10 pruebas una vez
npm test           # modo observacion
npm run coverage   # reporte de cobertura
```

## Vistas por rol

| Rol | Vistas |
| --- | --- |
| Cliente | Solicitud de personal |
| Reclutador | Trabajadores |
| Coordinador | Gestion de personal |
| Trabajador | Marcar asistencia |
| Jefe de RR.HH. | Panel con reporte de horas y costos |
| Administrador | Usuarios y Trabajadores |

Todos los roles con sesion tienen ademas Inicio y Panel.

## Usuarios de prueba

El inicio de sesion pide correo, RUT y contraseña. El RUT funciona con o sin puntos y guion.

| Rol | Correo | RUT | Contraseña |
| --- | --- | --- | --- |
| Administrador | admin.staffpro@gmail.com | 12.345.678-5 | admin123 |
| Jefe de RR.HH. | rrhh.staffpro@gmail.com | 23.456.789-6 | rrhh1234 |
| Coordinador | coord.staffpro@gmail.com | 18.765.432-7 | coord123 |
| Reclutador | recluta.staffpro@gmail.com | 15.234.567-4 | recluta12 |
| Cliente | camila.reyes@gmail.com | 17.654.321-3 | cliente12 |
| Trabajador | juan.perez@gmail.com | 11.111.111-1 | trabajo12 |

## Nota sobre los datos

Los datos son simulados y viven en memoria (src/data/db.js). Los cambios duran mientras la app este abierta; al recargar la pagina vuelven los datos de ejemplo.
