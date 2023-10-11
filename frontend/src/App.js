import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import ReactGA from 'react-ga';

import CapstoneDetails from './components/Capstone/CapstoneDetails';
import CreateCapstone from './components/Capstone/CreateCapstone';
import RouteChangeTracker from "./components/RouteChangeTracker/";
import AllCapstones from './components/Capstone/AllCapstones';
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import { authenticate } from "./store/session";
import Profile from "./components/Profile";

const TRACKING_ID = "UA-288524155-3";
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#8A5630',
        main: '#6D411C',
        dark: '#542A10',
      },
      secondary: {
        light: '#F5F4D4',
        main: '#EEECBE',
        dark: '#DAD8A8',
      },
      accent: {
        light: '#C8C457',
        main: '#B2AC2E',
        dark: '#99901D',
      },
      text: {
        main: '#24090B',
      }
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: '#24090B',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            "&:before": {
              borderBottomColor: '#B2AC2E',
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor: '#B2AC2E',
            },
            "&:after": {
              borderBottomColor: '#B2AC2E',
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#542A10',
            }
          },
          label: {
            fontWeight: 'bold',
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInput-underline:before': {
              borderBottomColor: '#B2AC2E',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: '#B2AC2E',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#B2AC2E',
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Navigation isLoaded={isLoaded} />
      <RouteChangeTracker />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          {sessionUser &&
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
              <Route exact path="/users/:userId">
                <Profile />
              </Route>
            </>
          }
          <Route path="*">
            <Redirect to={sessionUser ? "/capstones" : "/"} />
          </Route>
        </Switch>
      }
    </ThemeProvider>
  );
}

export default App;
