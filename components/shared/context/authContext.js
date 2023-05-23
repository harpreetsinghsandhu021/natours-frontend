import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  userRole: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
