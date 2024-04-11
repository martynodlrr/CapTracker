import { useHistory } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import Button from '@mui/material/Button'
import ReactGA from 'react-ga'
import React, { useEffect, useState } from 'react'

import './index.css'

function LandingPage({ user }) {
  const history = useHistory()
  const { loginWithRedirect } = useAuth0()
  const [currentSection, setCurrentSection] = useState('')

  const handleGetStartedClick = () => {
    ReactGA.event({
      category: 'Homepage',
      action: 'Get Started Clicked While Logged In',
    })

    history.push('/capstones')
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = ['header', 'intro', 'feature-1', 'feature-2', 'feature-3', 'cta']

      if (scrollPosition === 0) {
        setCurrentSection('header')
        return
      }

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionElement = document.querySelector(`.${section}`)
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop
          const sectionBottom = sectionTop + sectionElement.clientHeight

          if (['header', 'intro'].includes(section)) {
            if (scrollPosition >= sectionTop - 400 && scrollPosition <= sectionBottom - 400) {
              // If user is in the current section, set it as active
              setCurrentSection(section)
            }
          } else if ( section !== 'cta' ) {
            if (scrollPosition >= sectionTop - 800 && scrollPosition <= sectionBottom + 400) {
              // If user is in the current section, set it as active
              setCurrentSection(section)
            }
          } else {
            if (scrollPosition >= sectionTop - 400 && scrollPosition <= sectionBottom + 800) {
              // If user is in the current section, set it as active
              setCurrentSection(section)
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <header
        className={`header ${currentSection === 'header' ? 'active' : ''}`}>
        <h1>Welcome to CapTracker</h1>
        <h3>Where projects swiftly meet quality feedback.</h3>
      </header>

      <section className={`intro ${currentSection === 'intro' ? 'active' : ''}`}>
        <div className="container">
          <h2>Post. Share. Improve.</h2>
          <h3>Join a community built on insightful interactions, helping you refine your projects effectively and efficiently.</h3>
        </div>
      </section>

      <section className='features'>
        <div className="container">
          <div className={`feature-1 ${currentSection === 'feature-1' ? 'active' : ''}`}>
            <h2>Real-Time Feedback</h2>
            <h3>Don't wait around. Our vibrant community is on standby to provide timely feedback.</h3>
          </div>
          <div className={`feature-2 ${currentSection === 'feature-2' ? 'active' : ''}`}>
            <h2>Optimized User Experience</h2>
            <h3>With a focus on user experience, sharing and receiving feedback is seamless and intuitive.</h3>
          </div>
          <div className={`feature-3 ${currentSection === 'feature-3' ? 'active' : ''}`}>
            <h2>Insights That Matter</h2>
            <h3>Go beyond superficial comments and get in-depth insights that can truly elevate your projects.</h3>
          </div>
        </div>
      </section>

      <section className={`cta ${currentSection === 'cta' ? 'active' : ''}`}>
        <div className="container">
          <h2>Join CapTracker Today</h2>
          <h3>Step into a space where your projects get the attention and constructive feedback they deserve.</h3>
          {!user ?
            <Button
              onClick={loginWithRedirect}
              className='btn'
              variant="outlined"
            >Get Started</Button> :
            <Button
              onClick={handleGetStartedClick}
              className='btn'
              variant="contained"
            >Get started</Button>}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
