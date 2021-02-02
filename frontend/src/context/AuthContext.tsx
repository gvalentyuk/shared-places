import { createContext } from "react";

type User = {
  name: string;
  token: string;
  id: string;
};

export const AuthContext = createContext({
  isLogged: false,
  login: (user: User) => {},
  logout: () => {},
  user: { name: "", token: "", id: "" },
});
