import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapPage from "../pages/MapPage";
import Users from "../pages/Users";
import Groups from "../pages/Groups";
import Login from "../pages/Login/Login";
import { PrivateRoute } from "./privateRoute";
import Logout from "../guard/auth/components/Logout";

export const ROUTES_PATH = {
  login: { route: "/mapserver/login", use: "/mapserver/login" },
  logout: { route: "/mapserver/logout", use: "/mapserver/logout" },
  home: { route: "/mapserver", use: "/mapserver" },
  groups: { route: "/mapserver/groups", use: "/mapserver/groups" },
  map: { route: "/mapserver/map", use: "/mapserver/map" },
  users: { route: "/mapserver/users", use: "/mapserver/users" },
};

export const ROUTES = [
  {
    path: ROUTES_PATH.login.route,
    isPublic: true,
    element: <Login />,
  },
  {
    path: ROUTES_PATH.logout.route,
    isPublic: true,
    element: <Logout />,
  },
  {
    path: ROUTES_PATH.home.route,
    isPublic: false,
    element: <Home />,
  },
  {
    path: ROUTES_PATH.map.route,
    isPublic: false,
    element: <MapPage />,
  },
  {
    path: ROUTES_PATH.users.route,
    isPublic: true,
    element: <Users />,
  },
  {
    path: ROUTES_PATH.groups.route,
    isPublic: true,
    element: <Groups />,
  },
];

export default function ApplicationRoutes() {
  function getRoutes() {
    let rt = ROUTES.map((r, i) => {
      if (r.isPublic) {
        return <Route key={i} {...r} />;
      } else {
        console.log("testeeee", i);
        return (
          <Route
            key={i}
            {...r}
            element={<PrivateRoute element={r.element} />}
          />
        );
      }
    });
    return rt;
  }

  return <Routes>{getRoutes()}</Routes>;
}
