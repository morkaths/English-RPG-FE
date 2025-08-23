import React from "react";
import { Routes, Route } from "react-router";
import PublicRoutes from "./public";
import { RequireAuth } from "./guard";

/**
 * Bọc element bằng guard nếu route có required (auth,admin,...).
 * @param route Đối tượng route trong cấu hình
 * @param element React element (component của route)
 * @returns Element đã được bọc guard nếu cần
 */
function wrapElement(route: any, element: React.ReactElement) {
  let wrapped = element;
  if (route.requiresAuth) {
    wrapped = <RequireAuth requiresAuth>{wrapped}</RequireAuth>;
  }
  return wrapped;
}

/**
 * Đệ quy mảng route thành các <Route> của React Router v6+.
 * Nếu route có children, sẽ tạo route cha (layout) và render các route con bên trong.
 * @param routes Mảng cấu hình route (có thể có children cho nested layout)
 * @returns Mảng các <Route> JSX đã được render
 */
function renderRoutes(routes: any[]) {
  return routes.map((route, idx) => {
    if (route.children) {
      return (
        <Route key={idx} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return (
      <Route
        key={idx}
        path={route.path}
        element={wrapElement(route, route.element)}
      />
    );
  });
}

const AppRoutes = () => <Routes>{renderRoutes(PublicRoutes)}</Routes>;
export default AppRoutes;