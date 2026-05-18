import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import VisualizacionConsulta from './pages/VisualizacionConsulta';
import MiTerritorio from './pages/MiTerritorio';
import MiPlanDeVida from './pages/MiPlanDeVida';
import PlanDetalle from './pages/MiPlanDeVida/PlanDetalle';
import PlanMiTerritorio    from './pages/MiPlanDeVida/PlanDetalle/PlanMiTerritorio';
import PlanMiPlanDeVida    from './pages/MiPlanDeVida/PlanDetalle/PlanMiPlanDeVida';
import PlanFortalecimiento from './pages/MiPlanDeVida/PlanDetalle/PlanFortalecimiento';
import PlanTejiendoCaminos from './pages/MiPlanDeVida/PlanDetalle/PlanTejiendoCaminos';
import PlanArchivoVivo     from './pages/MiPlanDeVida/PlanDetalle/PlanArchivoVivo';
import Fortalecimiento from './pages/Fortalecimiento';
import TejiendoCaminos from './pages/TejiendoCaminos';
import ArchivoVivo from './pages/ArchivoVivo';
import Reportes from './pages/Reportes';
import Administracion       from './pages/Administracion';
import OrganizacionDetalle    from './pages/OrganizacionDetalle';
import OrgMiTerritorio        from './pages/OrganizacionDetalle/OrgMiTerritorio';
import OrgMiPlanDeVida        from './pages/OrganizacionDetalle/OrgMiPlanDeVida';
import OrgFortalecimiento     from './pages/OrganizacionDetalle/OrgFortalecimiento';
import OrgTejiendoCaminos     from './pages/OrganizacionDetalle/OrgTejiendoCaminos';
import OrgArchivoVivo         from './pages/OrganizacionDetalle/OrgArchivoVivo';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true,                       element: <Home /> },
        { path: 'visualizacion',             element: <VisualizacionConsulta /> },
        { path: 'mi-territorio',             element: <MiTerritorio /> },
        { path: 'mi-plan-de-vida',           element: <MiPlanDeVida /> },
        { path: 'mi-plan-de-vida/plan/:id',                       element: <PlanDetalle /> },
        { path: 'mi-plan-de-vida/plan/:id/mi-territorio',          element: <PlanMiTerritorio /> },
        { path: 'mi-plan-de-vida/plan/:id/mi-plan-de-vida-modulo', element: <PlanMiPlanDeVida /> },
        { path: 'mi-plan-de-vida/plan/:id/fortalecimiento',        element: <PlanFortalecimiento /> },
        { path: 'mi-plan-de-vida/plan/:id/tejiendo-caminos',       element: <PlanTejiendoCaminos /> },
        { path: 'mi-plan-de-vida/plan/:id/archivo-vivo',           element: <PlanArchivoVivo /> },
        { path: 'fortalecimiento',           element: <Fortalecimiento /> },
        { path: 'tejiendo-caminos',          element: <TejiendoCaminos /> },
        { path: 'archivo-vivo',              element: <ArchivoVivo /> },
        { path: 'reportes',                  element: <Reportes /> },
        { path: 'admin',                     element: <Administracion /> },
        { path: 'org/:slug',                              element: <OrganizacionDetalle /> },
        { path: 'org/:slug/mi-territorio',               element: <OrgMiTerritorio /> },
        { path: 'org/:slug/mi-plan-de-vida-modulo',      element: <OrgMiPlanDeVida /> },
        { path: 'org/:slug/fortalecimiento',             element: <OrgFortalecimiento /> },
        { path: 'org/:slug/tejiendo-caminos',            element: <OrgTejiendoCaminos /> },
        { path: 'org/:slug/archivo-vivo',                element: <OrgArchivoVivo /> },
        { path: '*',                         element: <NotFound /> },
      ],
    },
  ],
  {
    basename: '/observatorio-planesdevida',
  }
);

export default router;
