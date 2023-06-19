import { useCallback, useContext } from "react";
import { authGuard } from "../guard/auth/components/AuthGuard";
import jwt from "jwt-decode";
import { useRoutes } from "./useRoutes";
import { UserContext, UserContextData } from "../context/userContext";
import { serverMapService } from "../service/axiosServer";

export function useUser() {
  const { user, setUser, loading, setLoading } =
    useContext<UserContextData>(UserContext);
  const { routes } = useRoutes();

  const checkRedirectPage = useCallback(() => {
    const redirect = localStorage.getItem("redirect-page");
    localStorage.removeItem("redirect-page");
    if (
      redirect &&
      !redirect.includes("login") &&
      !redirect.includes("logout")
    ) {
      window.location.href = redirect;
    } else {
      routes.home();
    }
  }, [routes]);

  const handleLogin = useCallback(
    async (params: { email: string; password: string }) => {
      try {
        console.log("testeeeeee");
        setLoading(true);
        const response = await serverMapService.authUser(params);
        console.log("response", response);

        if (response.access_token) {
          const token = response.access_token;
          authGuard.setTokenToLocalStorage(response);
          const userDecoded: any = jwt(token);
          if (userDecoded) {
            setUser({
              id: userDecoded.id,
              name: userDecoded.name,
              type: userDecoded.type,
              email: userDecoded.email,
            });
          }
          checkRedirectPage();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    user,
    setUser,
    handleLogin,
    loading,
  };
}
