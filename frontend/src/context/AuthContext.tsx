import { createContext } from "react";

export const AuthContext = createContext({
  isLogged: false,
  login: (token: string) => {},
  logout: () => {},
  token: '',
});
