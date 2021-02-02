import React, { Suspense } from "react";
import { useAuth } from "./hooks/auth";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/UI/LoadingSpinner";
import "./App.css";

const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App: React.FC = () => {
  const { isLogged, login, logout, user } = useAuth();
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
    <AuthContext.Provider value={{ isLogged, login, logout, user }}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}{" "}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
