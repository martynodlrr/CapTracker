import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import * as capstoneActions from '../../../store/capstone';
import ReviewRender from '../../Review/ReviewRender';
import CapstoneImages from '../CapstoneImages';

import './index.css';

function CapstoneDetails() {
  const dispatch = useDispatch();
  const { capstoneId } = useParams();
  const capstone = useSelector(state => state.capstones && state.capstones.allCapstones && state.capstones.allCapstones[capstoneId]);

  useEffect(() => {
    if (!capstone) {
      dispatch(capstoneActions.fetchSingleCapstone(capstoneId));
    }
  }, [capstone, capstoneId, dispatch]);

  if (!capstone) {
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
    <>
      <div className="Capstone-details">
        <div className='capstone'>
          <h1 className='heading'>{capstone.title}</h1>

          <section>
            <CapstoneImages images={capstone.capstoneImages} capstoneId={capstone.id} link={capstone.url} />
          </section>

          <section>
            <section className='link'>
              <p>Site Cloned: {capstone.clonedFrom}</p>
              <a href={capstone.url} target="_blank" rel="noopener noreferrer">
                Visit project
              </a>
            </section>
            <p id='description'>About: {capstone.description}</p>
          </section>

        </div>
        <div id='author'>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {capstone.author && (
              <>
                <h2
                  className='heading'
                >
                  {capstone.author.nickName}
                </h2>
                <div
                  className='image-container'
                  style={{
                    width: '200px',
                    height: '200px'
                  }}
                >
                  <img
                    src={capstone.author.picture}
                    alt={`${capstone.author.given_name} ${capstone.author.family_name}`}
                  />
                </div>

                {capstone.author.GitHub || capstone.author.LinkedIn || capstone.author.email ?
                  <>
                    <p>Get in Touch:</p>
                    <section
                      className='contact'
                      style={{
                        width: '-webkit-fill-available',
                      }}
                    >

                      {capstone.author.email && (
                        <a href={`mailto:${capstone.author.email}`} target="_blank" rel="noopener noreferrer">
                          <EmailIcon />
                        </a>
                      )}

                      {capstone.author.GitHub && (
                        <a href={capstone.author.GitHub && !capstone.author.GitHub.startsWith('http') ? `http://${capstone.author.GitHub}` : capstone.author.GitHub} target="_blank" rel="noopener noreferrer">
                          <GitHubIcon />
                        </a>
                      )}

                      {capstone.author.LinkedIn && (
                        <a href={capstone.author.LinkedIn && !capstone.author.LinkedIn.startsWith('http') ? `http://${capstone.author.LinkedIn}` : capstone.author.LinkedIn} target="_blank" rel="noopener noreferrer">
                          <LinkedInIcon />
                        </a>
                      )}

                    </section>
                  </>
                  : null}
              </>
            )}
          </section>
        </div>
      </div>

      <div>
        <section
          className='reviews'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h2 className='heading'>Comments: </h2>
          <ReviewRender capstoneId={capstone.id} ownerId={capstone.author.id} />
        </section>
      </div>
    </>
  );
}

export default CapstoneDetails;
