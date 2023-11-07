import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import * as capstoneActions from '../../../store/capstone';
import ReviewRender from '../../Review/ReviewRender';
import CapstoneImages from '../CapstoneImages';
import './index.css';

function CapstoneDetails() {
  const { capstoneId } = useParams();
  const capstone = useSelector(state => state.capstones && state.capstones.allCapstones && state.capstones.allCapstones[capstoneId]);
  const [author, setAuthor] = useState(null);
  const dispatch = useDispatch();

  const api = axios.create({
    baseURL: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`,
    headers: { 'content-type': 'application/json' }
  });

  const getAuth0Token = async () => {
    return api.post('/oauth/token', {
      client_id: process.env.REACT_APP_AUTH0_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials"
    });
  };

  const getUserDetails = async (token, authorId) => {
    const providers = ['auth0|', 'google-oauth2|', 'github|'];
    for (const provider of providers) {
      try {
        const response = await api.get(`/api/v2/users/${provider}${authorId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data) return response.data;
      } catch (_e) {
      }
    }
  };

  useEffect(() => {
    if (!capstone) {
      dispatch(capstoneActions.fetchSingleCapstone(capstoneId));
    } else {
      getAuth0Token()
        .then(response => {
          const accessToken = response.data.access_token;
          return getUserDetails(accessToken, capstone.author);
        })
        .then(response => {
          setAuthor(response);
        })
        .catch(error => {
          console.error('Error in fetching user data:', error);
        });
    }
  }, [capstone, capstoneId, dispatch]);

  if (!capstone || !author || !Object.values(author).length) {
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
              <p><strong>Site Cloned:</strong> {capstone.clonedFrom}</p>
              <a href={capstone.url} target="_blank" rel="noopener noreferrer">
                Visit project
              </a>
            </section>
            <p id='description'>{capstone.description}</p>
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
            {author && (
              <>
                <div
                  className='image-container'
                  style={{
                    width: '200px',
                    height: '200px'
                  }}
                >
                  <img
                    src={author.picture}
                    alt={`${author.nick_name || author.nickname}`}
                  />
                </div>
                <h2
                  className='heading'
                >
                  {author.nick_name || author.nickname}
                </h2>

                {author.github || author.linkedin || author.email ?
                  <>
                    <p>Get in Touch:</p>
                    <section
                      className='contact'
                      style={{
                        width: '-webkit-fill-available',
                      }}
                    >

                      {author.email && (
                        <a
                          href={`mailto:${author.email}`}
                          target="_blank"
                          className='contactBtn'
                          rel="noopener noreferrer"
                        >
                          <EmailIcon
                            style={{
                              color: '#24090B',
                            }}
                          />
                        </a>
                      )}

                      {author.github && (
                        <a
                          href={author.github && !author.github.startsWith('http') ? `http://${author.github}` : author.github}
                          target="_blank"
                          className='contactBtn'
                          rel="noopener noreferrer"
                        >
                          <GitHubIcon
                            style={{
                              color: '#24090B'
                            }}
                          />
                        </a>
                      )}

                      {author.linkedin && (
                        <a
                          href={author.linkedin.startsWith('https://') ? author.linkedin : `https://${author.linkedin}/`}
                          className='contactBtn'
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedInIcon
                            style={{
                              color: '#24090B'
                            }}
                          />
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
          <ReviewRender capstoneId={capstone.id} ownerId={author.user_id} />
        </section>
      </div>
    </>
  );
}

export default CapstoneDetails;
