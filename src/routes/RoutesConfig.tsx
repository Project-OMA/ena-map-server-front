import { Navigate } from 'react-router-dom';
import UserTypes from '../constants/UserTypes';

import Login from '../pages/shared/Login/Login';
import Logout from "../guard/auth/components/Logout";
import Error404 from '../pages/shared/Error404';

import Teacher_Home from '../pages/teacher/Home/Home';
import Teacher_Maps from '../pages/teacher/Maps';
import Teacher_Users from '../pages/teacher/Users';
import Teacher_Groups from '../pages/teacher/Groups';
import Teacher_MyGroups from '../pages/teacher/MyGroups';

import Student_MyGroups from '../pages/student/MyGroups';
import Student_Home from '../pages/student/Home/Home';

import Admin_MyGroups from '../pages/admin/MyGroups';
import Admin_Home from '../pages/admin/Home/Home';
import Admin_Maps from '../pages/admin/Maps';
import Admin_Users from '../pages/admin/Users';
import Admin_Groups from '../pages/admin/Groups';
import Group from '../pages/shared/Group';

export const ROUTES_PATH = {
  login: { route: "/mapserver/login", use: "/mapserver/login" },
  logout: { route: "/mapserver/logout", use: "/mapserver/logout" },
  home: { route: "/mapserver", use: "/mapserver" },
  groups: { route: "/mapserver/groups", use: "/mapserver/groups" },
  groupById: { route: "/mapserver/groups/:id", use: "/mapserver/groups" },
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
      [UserTypes.ADMIN]: () => <Admin_Home />,
      [UserTypes.TEACHER]: () => <Teacher_Home />,
      [UserTypes.STUDENT]: () => <Student_Home />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.map.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Admin_Maps />,
      [UserTypes.TEACHER]: () => <Teacher_Maps />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.users.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Admin_Users />,
      [UserTypes.TEACHER]: () => <Teacher_Users />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.groups.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Admin_Groups />,
      [UserTypes.TEACHER]: () => <Teacher_Groups />,
      [UserTypes.STUDENT]: () => <Error404 />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.groupById.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Group />,
      [UserTypes.TEACHER]: () => <Group />,
      [UserTypes.STUDENT]: () => <Group />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
  {
    path: ROUTES_PATH.myGroups.route,
    isPublic: false,
    component: {
      [UserTypes.ADMIN]: () => <Admin_MyGroups />,
      [UserTypes.TEACHER]: () => <Teacher_MyGroups />,
      [UserTypes.STUDENT]: () => <Student_MyGroups />,
      [UserTypes.ANY]: () => <Error404 />,
    },
  },
];