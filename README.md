# StaffPro

Aplicacion web para la gestion de personal externo (Recursos Humanos). Migracion de StaffPro (HTML) a React + Bootstrap.

DSY1104 - Evaluacion Parcial 2

## Integrantes

- Catalina Chaparro - 
- Maximiliano Aguilera - 
- Josias Devia - 
## Tecnologias

- Vite + React (JavaScript)
- React Bootstrap + Bootstrap
- React Router
- Bootstrap Icons

## Usuarios de prueba

El inicio de sesion pide correo, RUT y contrasena.

| Rol | Correo | RUT | Contrasena | Que puede hacer |
|---|---|---|---|---|
| Administrador | admin.staffpro@gmail.com | 12.345.678-5 | admin123 | Usuarios, Trabajadores y reporte en el Panel |
| Jefe de RR.HH. | rrhh.staffpro@gmail.com | 23.456.789-6 | rrhh1234 | Panel con reporte de horas y costos |
| Coordinador | coord.staffpro@gmail.com | 18.765.432-7 | coord123 | Gestion de Personal |
| Reclutador | recluta.staffpro@gmail.com | 15.234.567-4 | recluta12 | Trabajadores |
| Cliente | camila.reyes@gmail.com | 17.654.321-3 | cliente12 | Solicitar Personal |
| Trabajador | juan.perez@gmail.com | 11.111.111-1 | trabajo12 | Marcar Asistencia |

Tambien se puede crear una cuenta de cliente desde "Crear Cuenta".

## Vistas

| Vista | Ruta | Quien la usa |
|---|---|---|
| Inicio | / | Todos |
| Acceso | /acceso | Sin sesion |
| Panel | /panel | Con sesion |
| Solicitud de personal | /solicitud | Cliente |
| Gestion de personal | /gestion | Coordinador |
| Asistencia | /asistencia | Trabajador |
| Trabajadores | /trabajadores | Reclutador, Administrador |
| Usuarios | /usuarios | Administrador |

## Notas

- Los datos son simulados y viven en memoria (`src/data/db.js`). Al recargar la pagina vuelven los datos de ejemplo.
- Cada rol ve un menu distinto segun su tipo de usuario.
