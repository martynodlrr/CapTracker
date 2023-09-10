import React from 'react';
import './index.css';

function LandingPage() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>CapTracker</h1>
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
            <p>Don't wait around. Our vibrant community is on standby to provide immediate feedback.</p>
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
          <button>Get Started</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
