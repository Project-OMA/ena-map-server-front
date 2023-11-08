import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../routes/RoutesConfig";

export type UseRoutesReturn = {
  routes: {
    home: () => void;
    map: () => void;
    users: () => void;
    groups: () => void;
    myGroups: () => void;
    goBack: () => void;
    logout: () => void;
  };
};

export function useRoutes(): UseRoutesReturn {
  let navigate = useNavigate();
  const routes = useMemo(
    () => ({
      home: () => {
        navigate(ROUTES_PATH.home.use);
      },
      map: () => {
        navigate(ROUTES_PATH.map.use);
      },
      users: () => {
        navigate(ROUTES_PATH.users.use);
      },
      groups: () => {
        navigate(ROUTES_PATH.groups.use);
      },
      myGroups: () => {
        navigate(ROUTES_PATH.myGroups.use);
      },
      logout: () => {
        navigate(ROUTES_PATH.logout.use);
      },
      goBack: () => {
        navigate(-1);
      },
    }),
    [navigate]
  );

  return {
    routes,
  };
}
