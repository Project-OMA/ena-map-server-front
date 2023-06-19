import React, { useState, createContext, useEffect } from "react";
import { PropChildrenType } from "../types";
import jwt from "jwt-decode";
import { serverMapService } from "../service/axiosServer";
import { authGuard } from "../guard/auth/components/AuthGuard";

export interface UserContextData {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const UserProvider = ({ children }: PropChildrenType) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (authGuard.isAuthenticated()) {
      const token = authGuard.getLocalToken();
      const userLocale: any = jwt(token.access_token);
      if (userLocale) {
        setUser({
          id: userLocale.id,
          name: userLocale.name,
          type: userLocale.type,
          email: userLocale.email,
        });
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
