import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../routes/routes";

export type UseRoutesReturn = {
  routes: {
    home: () => void;
    map: () => void;
    users: () => void;
    goBack: () => void;
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
