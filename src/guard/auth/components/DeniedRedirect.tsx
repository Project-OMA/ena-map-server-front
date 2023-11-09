import { Navigate } from "react-router-dom";
import { ROUTES_PATH } from "../../../routes/RoutesConfig";

export const DeniedRedirect = () => {
  if (
    !window.location.href.includes("login") &&
    !window.location.href.includes("logout")
  ) {
    localStorage.setItem("redirect-page", window.location.href);
  }

  return <Navigate to={{ pathname: ROUTES_PATH.login.use }} />;
};
