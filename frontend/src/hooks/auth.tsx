import { useEffect, useState, useCallback } from "react";

export const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [user, setUser] = useState({ name: "", token: "", id: "" });

  const login = useCallback((user, expirationDate?) => {
    setIsLogged(true);
    setUser(user);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, expiration: tokenExpirationDate.toISOString() })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false);
    setTokenExpirationDate(null);
    setUser({ name: "", token: "", id: "" });
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    let logoutTimer;
    if (user.token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user.token, tokenExpirationDate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (
      userData &&
      userData.token &&
      new Date(userData.tokenExpirationDate) > new Date()
    ) {
      login(userData, new Date(userData.tokenExpirationDate));
    }
  }, [login]);

  return { isLogged, login, logout, user };
};
