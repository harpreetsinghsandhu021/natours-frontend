import { useState, useEffect, useCallback } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((token, userId, uRole) => {
    setToken(token);
    setUserId(userId);
    setUserRole(uRole);
    setIsLoggedIn(true);

    setCookie("token", token);
    setCookie("user", userId);
    setCookie("role", uRole);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserRole(null);
    setIsLoggedIn(false);

    deleteCookie("token");
    deleteCookie("user");
    deleteCookie("role");
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    const userId = getCookie("user");
    const userRole = getCookie("role");

    if (token) {
      login(token, userId, userRole);
    }
  }, [isLoggedIn]);

  return { token, userId, userRole, login, logout };
};
