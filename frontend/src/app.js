import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";
import ReactGA from 'react-ga';

import CapstoneDetails from './components/Capstone/CapstoneDetails';
import CreateCapstone from './components/Capstone/CreateCapstone';
import RouteChangeTracker from "./components/RouteChangeTracker";
import AllCapstones from './components/Capstone/AllCapstones';
import StackRender from "./components/StackAndTechnologies";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import theme from "./MUThemeObj";

const TRACKING_ID = "UA-288524155-4";
ReactGA.initialize(TRACKING_ID);

function App() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: 'auto', background: 'rgb(247, 247, 239)', display: 'block', shapeRendering: 'auto' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#0a0a0a" strokeWidth="7" strokeDasharray="233.4959246826172 23.093003540039064" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{ transform: 'scale(1)', transformOrigin: '50px 50px' }}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.8518518518518516s" keyTimes="0;1" values="0;256.58892822265625"></animate>
          </path>
        </svg>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Navigation user={user} />
      <RouteChangeTracker />
        <Switch>
          <Route exact path="/">
            <LandingPage user={user} />
          </Route>
          { user &&
            <>
              <Route exact path="/capstone/edit">
                <CreateCapstone />
              </Route>
              <Route exact path="/capstones">
                <AllCapstones />
              </Route>
              <Route exact path="/capstones/:capstoneId">
                <CapstoneDetails />
              </Route>
              <Route exact path="/user">
                <Profile />
              </Route>
            </>
          }
          <Route path="*">
            <Redirect to={ user ? "/capstones" : "/"} />
          </Route>
        </Switch>
      <StackRender />
    </ThemeProvider>
  );
}

export default App;
