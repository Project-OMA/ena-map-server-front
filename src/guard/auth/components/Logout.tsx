import { authGuard } from "./AuthGuard";
import { useUser } from "../../../hooks/useUser";
import { DeniedRedirect } from "./DeniedRedirect";

export default function Logout() {
  const { setUser } = useUser();

  const clearApplcation = () => {
    setUser(null);
    authGuard.logout();
  };

  clearApplcation();

  return <DeniedRedirect />;
}
