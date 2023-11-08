import UserTypes from '../constants/UserTypes';
import Error404 from '../pages/shared/Error404';
import Logout from "../guard/auth/components/Logout";
import MyGroups from '../pages/MyGroups';
import Home from "../pages/Home/Home";
import MapPage from "../pages/MapPage";
import Users from "../pages/Users";
import Groups from "../pages/Groups";
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';

export const ROUTES_PATH = {
  login: { route: "/mapserver/login", use: "/mapserver/login" },
  logout: { route: "/mapserver/logout", use: "/mapserver/logout" },
  home: { route: "/mapserver", use: "/mapserver" },
  groups: { route: "/mapserver/groups", use: "/mapserver/groups" },
  myGroups: { route: "/mapserver/my-groups", use: "/mapserver/my-groups" },
  map: { route: "/mapserver/map", use: "/mapserver/map" },
  users: { route: "/mapserver/users", use: "/mapserver/users" }
};
export const ROUTES = [
  {
    path: ROUTES_PATH.login.route,
    isPublic: true,
    component: {
      [UserTypes.ADMIN]: () => <Navigate to={ROUTES_PATH.home.route} />,
      [UserTypes.TEACHER]: () => <Navigate to={ROUTES_PATH.home.route} />,
      [UserTypes.STUDENT]: () => <Navigate to={ROUTES_PATH.home.route} />,
      [UserTypes.ANY]: () => <Login />,
    } 
  },
  {
    path: ROUTES_PATH.logout.route,
    isPublic: true,
    component: {
      [UserTypes.ADMIN]: () => <Logout />,
      [UserTypes.TEACHER]: () => <Logout />,
      [UserTypes.STUDENT]: () => <Logout />,
      [UserTypes.ANY]: () => <Logout />,
    },
  },
  {
    path: ROUTES_PATH.home.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Home />,
      [UserTypes.TEACHER]: () => <Home />,
      [UserTypes.STUDENT]: () => <Home />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.map.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <MapPage />,
      [UserTypes.TEACHER]: () => <MapPage />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.users.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Users />,
      [UserTypes.TEACHER]: () => <Users />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.groups.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Groups />,
      [UserTypes.TEACHER]: () => <Groups />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.myGroups.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <MyGroups />,
      [UserTypes.TEACHER]: () => <MyGroups />,
      [UserTypes.STUDENT]: () => <MyGroups />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
];