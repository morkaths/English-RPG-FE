// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from 'src/layouts/full/shared/loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// utilities
const Typography = Loadable(lazy(() => import('../pages/typography/Typography')));
const Table = Loadable(lazy(() => import('../pages/tables/Table')));
const Form = Loadable(lazy(() => import('../pages/forms/Form')));
const Shadow = Loadable(lazy(() => import('../pages/shadows/Shadow')));

// authentication
const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
const Error = Loadable(lazy(() => import('../pages/auth/error')));

// pages
const Dashboard = Loadable(lazy(() => import('../pages/dashboards')));
const SamplePage = Loadable(lazy(() => import('../pages/sample-page')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'ui/typography', element: <Typography /> },
      { path: 'ui/table', element: <Table /> },
      { path: 'ui/form', element: <Form /> },
      { path: 'ui/shadow', element: <Shadow /> },
      { path: 'sample-page', element: <SamplePage /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: 'auth/login', element: <Login /> },
      { path: 'auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router, { basename: '/English-RPG' });
export default router;
