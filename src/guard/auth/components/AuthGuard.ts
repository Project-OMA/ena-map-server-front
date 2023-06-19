import jwt from "jwt-decode";

class AuthGuard {
  constructor() {}

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  setTokenToLocalStorage(tokenBody: string) {
    localStorage.setItem("token", JSON.stringify(tokenBody));
  }

  isAuthenticated() {
    if (!localStorage.getItem("token")) {
      return false;
    }
    return true;
  }

  isRedirectPage() {
    return localStorage.getItem("redirect-page");
  }

  getLocalUser() {
    if (this.isAuthenticated()) {
      const token = localStorage.getItem("token");
      return jwt(JSON.parse(token as string));
    }
  }

  getLocalToken() {
    if (this.isAuthenticated()) {
      const token = localStorage.getItem("token");
      return JSON.parse(token as string);
    }
  }
}

export const authGuard = new AuthGuard();
