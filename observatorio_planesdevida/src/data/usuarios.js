// Usuarios con acceso al panel de administración
//
// rol: 'admin_general' → puede editar todas las organizaciones
// rol: 'admin_org'     → solo puede editar la organización con orgId (id de organizaciones.js)
//
// En producción reemplazar claves por autenticación segura.

const usuarios = [
  // ── Admin general ─────────────────────────────────────
  {
    id: 1,
    usuario: 'admin_general',
    clave: 'Cisp2040',
    nombre: 'Administrador General CISP',
    rol: 'admin_general',
    orgId: null,
  },

  // ── Admins por organización (orgId = id en organizaciones.js) ─────────────
  { id: 2,  usuario: 'admin_achajawaa',      clave: 'Cisp2040', nombre: 'Admin Achajawaa Supunou Anaa',       rol: 'admin_org', orgId: 1  },
  { id: 3,  usuario: 'admin_crihu',          clave: 'Cisp2040', nombre: 'Admin CRIHU',                       rol: 'admin_org', orgId: 2  },
  { id: 4,  usuario: 'admin_eiruku',         clave: 'Cisp2040', nombre: 'Admin Wayuu Eiruku',                rol: 'admin_org', orgId: 3  },
  { id: 5,  usuario: 'admin_mioujirrawa',    clave: 'Cisp2040', nombre: 'Admin Wayuu Mioujirrawa',           rol: 'admin_org', orgId: 4  },
  { id: 6,  usuario: 'admin_ejepenajirrawa', clave: 'Cisp2040', nombre: 'Admin Wayuu Ejepenajirrawa',        rol: 'admin_org', orgId: 5  },
  { id: 7,  usuario: 'admin_trapecio',       clave: 'Cisp2040', nombre: 'Admin Cabildos Trapecio Amazónico', rol: 'admin_org', orgId: 6  },
  { id: 8,  usuario: 'admin_oia',            clave: 'Cisp2040', nombre: 'Admin OIA Antioquia',               rol: 'admin_org', orgId: 7  },
  { id: 9,  usuario: 'admin_parecito',       clave: 'Cisp2040', nombre: 'Admin Pared Parecito Eyabidara',    rol: 'admin_org', orgId: 8  },
  { id: 10, usuario: 'admin_zenu_esperanza', clave: 'Cisp2040', nombre: 'Admin Zenú La Esperanza',           rol: 'admin_org', orgId: 9  },
  { id: 11, usuario: 'admin_zenu_yuma',      clave: 'Cisp2040', nombre: 'Admin Zenú Yuma de las Piedras',    rol: 'admin_org', orgId: 10 },
  { id: 12, usuario: 'admin_azcimmo',        clave: 'Cisp2040', nombre: 'Admin AZCIMMO',                     rol: 'admin_org', orgId: 11 },
  { id: 13, usuario: 'admin_gobiernomayor',  clave: 'Cisp2040', nombre: 'Admin Gobierno Mayor',              rol: 'admin_org', orgId: 12 },
  { id: 14, usuario: 'admin_campobello',     clave: 'Cisp2040', nombre: 'Admin Cabildo Campo Bello',         rol: 'admin_org', orgId: 13 },
  { id: 15, usuario: 'admin_males',          clave: 'Cisp2040', nombre: 'Admin Resguardo de Males',          rol: 'admin_org', orgId: 14 },
  { id: 16, usuario: 'admin_chakiama',       clave: 'Cisp2040', nombre: 'Admin Chakiama CRICH',              rol: 'admin_org', orgId: 15 },
  { id: 17, usuario: 'admin_canime',         clave: 'Cisp2040', nombre: 'Admin Resguardo Canime',            rol: 'admin_org', orgId: 16 },
  { id: 18, usuario: 'admin_riosanjuan',     clave: 'Cisp2040', nombre: 'Admin Resguardo Río Alto San Juan', rol: 'admin_org', orgId: 17 },
  { id: 19, usuario: 'admin_losolivos',      clave: 'Cisp2040', nombre: 'Admin Cabildo Los Olivos',          rol: 'admin_org', orgId: 18 },
  { id: 20, usuario: 'admin_sabanacosta',    clave: 'Cisp2040', nombre: 'Admin Comunidad Sabana Costa',      rol: 'admin_org', orgId: 19 },
  { id: 21, usuario: 'admin_tuchin',         clave: 'Cisp2040', nombre: 'Admin Zenú Sabana Nueva Tuchín',    rol: 'admin_org', orgId: 20 },
  { id: 22, usuario: 'admin_wayuu_media',    clave: 'Cisp2040', nombre: 'Admin Wayuu Media y Alta Guajira',  rol: 'admin_org', orgId: 21 },
  { id: 23, usuario: 'admin_centorgua',      clave: 'Cisp2040', nombre: 'Admin Resguardo Centorgua Zenú',    rol: 'admin_org', orgId: 22 },
  { id: 24, usuario: 'admin_quinchia',       clave: 'Cisp2040', nombre: 'Admin Emberá Chamí Quinchía',       rol: 'admin_org', orgId: 23 },
  { id: 25, usuario: 'admin_yuyikkwe',       clave: 'Cisp2040', nombre: 'Admin Resguardo Yu Yikkwe',         rol: 'admin_org', orgId: 24 },
  { id: 26, usuario: 'admin_wuinpumuin',     clave: 'Cisp2040', nombre: 'Admin Wuinpumuin Alta Guajira',     rol: 'admin_org', orgId: 25 },
  { id: 27, usuario: 'admin_zenu_santander', clave: 'Cisp2040', nombre: 'Admin Zenú Santander de la Cruz',   rol: 'admin_org', orgId: 26 },
];

export default usuarios;
