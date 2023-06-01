import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapPage from "../pages/MapPage";
import Users from "../pages/Users";
import Groups from "../pages/Groups";

export const ROUTES_PATH = {
  home: { route: "/", use: "/" },
  groups: { route: "/groups", use: "/groups" },
  map: { route: "/map", use: "/map" },
  users: { route: "/users", use: "/users" },
};

export const ROUTES = [
  {
    path: ROUTES_PATH.home.route,
    isPublic: true,
    element: <Home />,
  },
  {
    path: ROUTES_PATH.map.route,
    isPublic: true,
    element: <MapPage />,
  },
  {
    path: ROUTES_PATH.users.route,
    isPublic: true,
    element: <Users />
  },
  {
    path: ROUTES_PATH.groups.route,
    isPublic: true,
    element: <Groups />,
  }
];

export default function ApplicationRoutes() {
  function getRoutes() {
    let rt = ROUTES.map((r, i) => {
      if (r.isPublic) {
        return <Route key={i} {...r} />;
      } else {
        return null;
      }
    });
    return rt;
  }

  return <Routes>{getRoutes()}</Routes>;
}
