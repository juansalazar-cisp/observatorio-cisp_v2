import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout               from './layout/MainLayout';
import Home                     from './pages/Home';
import VisualizacionConsulta    from './pages/VisualizacionConsulta';
import Reportes                 from './pages/Reportes';
import SobreElConvenio          from './pages/SobreElConvenio';
import TejiendoTrayectorias     from './pages/TejiendoTrayectorias';
import IniciativasComunitarias  from './pages/IniciativasComunitarias';
import IniciativaDetalle        from './pages/IniciativasComunitarias/IniciativaDetalle';
import TejiendoMiTerritorio     from './pages/IniciativasComunitarias/IniciativaDetalle/TejiendoMiTerritorio';
import TejiendoMisSaberes       from './pages/IniciativasComunitarias/IniciativaDetalle/TejiendoMisSaberes';
import TejiendoMiMemoria        from './pages/IniciativasComunitarias/IniciativaDetalle/TejiendoMiMemoria';
import EntretejienodoCaminos    from './pages/IniciativasComunitarias/IniciativaDetalle/EntretejienodoCaminos';
import TejidosQueTransforman    from './pages/IniciativasComunitarias/IniciativaDetalle/TejidosQueTransforman';
import IndiceCulturaEducacion   from './pages/IndiceCulturaEducacion';
import AdminIniciativas         from './pages/AdminIniciativas';
import NotFound                 from './pages/NotFound';

const BASE = '/iniciativas-comunitarias/iniciativa/:id';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,                        element: <Home /> },
      { path: 'visualizacion',              element: <VisualizacionConsulta /> },
      { path: 'reportes',                   element: <Reportes /> },
      { path: 'sobre-el-convenio',          element: <SobreElConvenio /> },
      { path: 'tejiendo-trayectorias',      element: <TejiendoTrayectorias /> },
      { path: 'iniciativas-comunitarias',              element: <IniciativasComunitarias /> },
      { path: `${BASE}`,                               element: <IniciativaDetalle /> },
      { path: `${BASE}/tejiendo-mi-territorio`,        element: <TejiendoMiTerritorio /> },
      { path: `${BASE}/tejiendo-mis-saberes`,          element: <TejiendoMisSaberes /> },
      { path: `${BASE}/tejiendo-mi-memoria`,           element: <TejiendoMiMemoria /> },
      { path: `${BASE}/entretejiendo-caminos`,         element: <EntretejienodoCaminos /> },
      { path: `${BASE}/tejidos-que-transforman`,       element: <TejidosQueTransforman /> },
      { path: 'indice-cultura-educacion',   element: <IndiceCulturaEducacion /> },
      { path: 'admin-iniciativas',          element: <AdminIniciativas /> },
      { path: '*',                          element: <NotFound /> },
    ],
  },
];

const router = __LOCAL_BUILD__
  ? createHashRouter(routes)
  : createBrowserRouter(routes, {
      basename: import.meta.env.PROD
        ? '/obsevatorio-tejiendoterritorios'
        : '/tejiendo-territorios',
    });

export default router;
