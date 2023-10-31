import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactGA from 'react-ga';
import React from 'react';

import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

import './index.css';

function LandingPage({ user}) {
  const history = useHistory();
  const theme = useTheme();

  const handleGetStartedClick = () => {
    ReactGA.event({
      category: 'Homepage',
      action: 'Get Started Clicked While Logged In',
    })

    history.push('/capstones');
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Welcome to CapTracker</h1>
          <h3>Where projects swiftly meet quality feedback.</h3>
        </div>
      </header>

      <section className="intro">
        <div className="container">
          <h2>Post. Share. Improve.</h2>
          <h3>Join a community built on insightful interactions, helping you refine your projects effectively and efficiently.</h3>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature">
            <h2>Real-Time Feedback</h2>
            <h3>Don't wait around. Our vibrant community is on standby to provide timely feedback.</h3>
          </div>
          <div className="feature">
            <h2>Optimized User Experience</h2>
            <h3>With a focus on user experience, sharing and receiving feedback is seamless and intuitive.</h3>
          </div>
          <div className="feature">
            <h2>Insights That Matter</h2>
            <h3>Go beyond superficial comments and get in-depth insights that can truly elevate your projects.</h3>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Join CapTracker Today</h2>
          <h3>Step into a space where your projects get the attention and constructive feedback they deserve.</h3>
          {!user ? <OpenModalButton
            buttonText="Get Started"
            modalComponent={
              <ThemeProvider theme={theme}>
                <SignupFormModal />
              </ThemeProvider>
            }
          /> :
            <Button onClick={handleGetStartedClick}>Get started</Button>}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
