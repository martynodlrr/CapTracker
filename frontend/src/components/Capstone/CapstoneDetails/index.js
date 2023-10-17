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
    return <p>Loading...</p>;
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
                  {capstone.author.userName}
                </h2>
                <div
                  className='image-container'
                  style={{
                    width: '200px',
                    height: '200px'
                  }}
                >
                  <img
                    src={capstone.author.pfp}
                    alt={`${capstone.author.firstName} ${capstone.author.lastName}`}
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
                      { console.log(capstone.author.email) }

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
