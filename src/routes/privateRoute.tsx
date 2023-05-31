import React, { FC } from "react";
import { authGuard } from "../guard/auth/components/AuthGuard";
import { DeniedRedirect } from "../guard/auth/components/DeniedRedirect";
interface PrivateRoutesProps {
  element: any;
}

export const PrivateRoute: FC<PrivateRoutesProps> = ({ element: Element }) => {
  if (!authGuard.isAuthenticated()) {
    return <DeniedRedirect />;
  }

  return Element;
};
