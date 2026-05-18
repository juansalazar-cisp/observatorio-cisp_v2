// Usuarios del sistema de administración de Iniciativas Comunitarias.
// admin_general: acceso a todas las iniciativas y configuración global.
// admin_iniciativa: acceso limitado a una iniciativa (por orgId = id de la iniciativa).

const usuariosIniciativas = [
  { id: 0,  usuario: 'admin_general', clave: 'Cisp2040', rol: 'admin_general',    orgId: null },
  { id: 1,  usuario: 'admin_ini_01',  clave: 'Cisp2040', rol: 'admin_iniciativa', orgId: 1   },
  { id: 2,  usuario: 'admin_ini_02',  clave: 'Cisp2040', rol: 'admin_iniciativa', orgId: 2   },
  { id: 3,  usuario: 'admin_ini_03',  clave: 'Cisp2040', rol: 'admin_iniciativa', orgId: 3   },
  { id: 4,  usuario: 'admin_ini_04',  clave: 'Cisp2040', rol: 'admin_iniciativa', orgId: 4   },
  { id: 5,  usuario: 'admin_ini_05',  clave: 'Cisp2040', rol: 'admin_iniciativa', orgId: 5   },
];

export default usuariosIniciativas;
