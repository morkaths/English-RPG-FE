// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy, ComponentType } from 'react';
import Loadable from 'src/layouts/full/shared/loadable';

/* Layouts */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Pages */
const Dashboard = Loadable(lazy(() => import('../pages/dashboards')));
const SamplePage = Loadable(lazy(() => import('../pages/sample-page')));
const Typography = Loadable(lazy(() => import('../pages/typography/Typography')));
const Table = Loadable(lazy(() => import('../pages/tables/Table')));
const Form = Loadable(lazy(() => import('../pages/forms')));
const Shadow = Loadable(lazy(() => import('../pages/shadows')));

// authentication
const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
const Error404 = Loadable(lazy(() => import('../pages/auth/error')));

export interface NestedRoute {
  path?: string;
  element: React.ReactNode;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  requiresSocket?: boolean;
  children?: NestedRoute[];
}

const PublicRoutes: NestedRoute[] = [
  {
    element: <FullLayout />,
    children: [
      { path: '/', element: <Dashboard />, requiresAuth: false },
      { path: '/sample-page', element: <SamplePage /> },
      { path: '/ui/typography', element: <Typography /> },
      { path: '/ui/table', element: <Table /> },
      { path: '/ui/form', element: <Form /> },
      { path: '/ui/shadow', element: <Shadow /> },
      { path: '*', element: <Error404 /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/error404', element: <Error404 /> },
      { path: '*', element: <Error404 /> },
    ],
  },
];

export default PublicRoutes;
