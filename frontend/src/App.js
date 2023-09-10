import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import AllCapstones from './components/Capstone/AllCapstones';
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          {sessionUser ? (
            <Route exact path="/capstones">
              <AllCapstones />
            </Route>
          ) : (
            <Route exact path="/capstones">
              <Redirect to="/" />
            </Route>
          )}
        </Switch>
      )}
    </>
  );
}

export default App;
