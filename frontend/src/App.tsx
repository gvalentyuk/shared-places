import React, { useState, useCallback } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import "./App.css";

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  console.log(token);
  const login = useCallback((token) => {
    setIsLogged(true);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false);
  }, []);

  let routes;
  if (isLogged) {
    routes = (
      <Switch>
        <Route path={"/"} exact component={Users} />
        <Route path={"/:userId/places"} exact component={UserPlaces} />
        <Route path={"/places/new"} component={NewPlace} />
        <Route path={"/places/:placeId"} component={UpdatePlace} />
        <Redirect to={"/"} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path={"/"} exact component={Users} />
        <Route path={"/auth"} component={Auth} />
        <Route path={"/:userId/places"} exact component={UserPlaces} />
        <Redirect to={"/auth"} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, token }}>
      <Router>
        <MainNavigation />
        <main>{routes} </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
