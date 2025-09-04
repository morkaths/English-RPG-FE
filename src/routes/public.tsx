// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy, ComponentType } from 'react';
import { Navigate } from "react-router-dom";
import paths from "../config/path.config";
import Loadable from 'src/layouts/full/shared/loadable';

/* Layouts */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Pages */
const SamplePage = Loadable(lazy(() => import('../pages/sample-page')));
const Dashboard = Loadable(lazy(() => import('../pages/dashboards')));
const CoursesPage = Loadable(lazy(() => import('../pages/courses')));
const CoursePageDetail = Loadable(lazy(() => import('../pages/courses/detail')));
const Pronunciation = Loadable(lazy(() => import('../pages/pronunciation')));


// UI page demo
const Typography = Loadable(lazy(() => import('../pages/typography/Typography')));
const Table = Loadable(lazy(() => import('../pages/tables/Table')));
const Form = Loadable(lazy(() => import('../pages/forms')));
const Shadow = Loadable(lazy(() => import('../pages/shadows')));

// authentication
const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Register = Loadable(lazy(() => import('../pages/auth/register')));
const Error404 = Loadable(lazy(() => import('../pages/auth/error/404')));
const Error403 = Loadable(lazy(() => import('../pages/auth/error/403')));

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
      { path: paths.sample, element: <SamplePage /> },
      { path: paths.home, element: <Dashboard /> },
      { path: paths.dashboard, element: <Dashboard />, requiresAuth: false },
      { path: paths.courses, element: <CoursesPage /> },
      { path: paths.courseDetail(':id'), element: <CoursePageDetail /> },
      { path: paths.pronunciation, element: <Pronunciation /> },

      // UI page demo
      { path: '/ui/typography', element: <Typography /> },
      { path: '/ui/table', element: <Table /> },
      { path: '/ui/form', element: <Form /> },
      { path: '/ui/shadow', element: <Shadow /> },

      { path: '*', element: <Navigate to={paths.error404} replace /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: paths.login, element: <Login /> },
      { path: paths.register, element: <Register /> },
      { path: paths.error404, element: <Error404 /> },
      { path: paths.error403, element: <Error403 /> },
      { path: '*', element: <Navigate to={paths.error404} replace /> },
    ],
  },
];

export default PublicRoutes;
