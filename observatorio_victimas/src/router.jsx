import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout                       from './layout/MainLayout';
import Home                             from './pages/Home';
import ComprendiendoReparacion          from './pages/ComprendiendoReparacion';
import Glosario                         from './pages/Glosario';
import Modulos                          from './pages/Modulos';
import RadiografiaAcceso                from './pages/Modulos/RadiografiaAcceso';
import BarrerasTerritorio               from './pages/Modulos/BarrerasTerritorio';
import MiradaVictimas                   from './pages/Modulos/MiradaVictimas';
import TrayectoriasContactabilidad      from './pages/Modulos/TrayectoriasContactabilidad';
import DinamicasOperativas              from './pages/Modulos/DinamicasOperativas';
import NotFound                         from './pages/NotFound';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,                                          element: <Home /> },
      { path: 'comprendiendo-reparacion',                    element: <ComprendiendoReparacion /> },
      { path: 'glosario',                                    element: <Glosario /> },
      { path: 'modulos',                                     element: <Modulos /> },
      { path: 'modulos/radiografia-acceso',                  element: <RadiografiaAcceso /> },
      { path: 'modulos/barreras-territorio',                 element: <BarrerasTerritorio /> },
      { path: 'modulos/mirada-victimas',                     element: <MiradaVictimas /> },
      { path: 'modulos/trayectorias-contactabilidad',        element: <TrayectoriasContactabilidad /> },
      { path: 'modulos/dinamicas-operativas',                element: <DinamicasOperativas /> },
      { path: '*',                                           element: <NotFound /> },
    ],
  },
];

const router = __LOCAL_BUILD__
  ? createHashRouter(routes)
  : createBrowserRouter(routes, {
      basename: '/observatorio-victimas',
    });

export default router;
