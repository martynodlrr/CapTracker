import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ReactGA from 'react-ga';
import React from 'react';

import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

import './index.css';

function LandingPage() {
  const sessionUser = useSelector((state) => state.session.user);
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
          <p>Where projects swiftly meet quality feedback.</p>
        </div>
      </header>

      <section className="intro">
        <div className="container">
          <h2>Post. Share. Improve.</h2>
          <p>Join a community built on insightful interactions, helping you refine your projects effectively and efficiently.</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature">
            <h3>Real-Time Feedback</h3>
            <p>Don't wait around. Our vibrant community is on standby to provide timely feedback.</p>
          </div>
          <div className="feature">
            <h3>Optimized User Experience</h3>
            <p>With a focus on user experience, sharing and receiving feedback is seamless and intuitive.</p>
          </div>
          <div className="feature">
            <h3>Insights That Matter</h3>
            <p>Go beyond superficial comments and get in-depth insights that can truly elevate your projects.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Join CapTracker Today</h2>
          <p>Step into a space where your projects get the attention and constructive feedback they deserve.</p>
          {!sessionUser ? <OpenModalButton
            buttonText="Get Started"
            modalComponent={
              <ThemeProvider theme={theme}>
                <SignupFormModal />
              </ThemeProvider>
            }
          /> :
            <Button onClick={() => handleGetStartedClick()}>Get started</Button>}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
