import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapPage from "../pages/MapPage";
import Students from "../pages/Students";

export const ROUTES_PATH = {
  home: { route: "/", use: "/" },
  group: { route: "/group", use: "/group" },
  map: { route: "/map", use: "/map" },
  students: { route: "/students", use: "/students" },
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
    path: ROUTES_PATH.students.route,
    isPublic: true,
    element: <Students />,
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
