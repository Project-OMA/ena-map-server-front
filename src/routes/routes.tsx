import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapPage from "../pages/MapPage";

export const ROUTES_PATH = {
  home: { route: "/", use: "/" },
  group: { route: "/group", use: "/group" },
  map: { route: "/map", use: "/map" },
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
