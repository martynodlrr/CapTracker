import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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

  const mgmtApiAccessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktpN2FycHR4SWpjTVlmcFFvUHRTaCJ9.eyJpc3MiOiJodHRwczovL2Rldi1oZmVwd2F1MG04Z3I0am5yLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuQ1hpZTNtSHk3QXk0ZzM5U2paU3pBaWZiWnBFdmZtakBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtaGZlcHdhdTBtOGdyNGpuci51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5ODcwMzE0NSwiZXhwIjoxNjk4Nzg5NTQ1LCJhenAiOiJuQ1hpZTNtSHk3QXk0ZzM5U2paU3pBaWZiWnBFdmZtaiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6cGhvbmVfcHJvdmlkZXJzIGNyZWF0ZTpwaG9uZV9wcm92aWRlcnMgcmVhZDpwaG9uZV9wcm92aWRlcnMgdXBkYXRlOnBob25lX3Byb3ZpZGVycyBkZWxldGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTpwaG9uZV90ZW1wbGF0ZXMgcmVhZDpwaG9uZV90ZW1wbGF0ZXMgdXBkYXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6ZW5jcnlwdGlvbl9rZXlzIHVwZGF0ZTplbmNyeXB0aW9uX2tleXMgZGVsZXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.LMhMKIkk13NkXccvax6V7JITgyz53rHEPoVPZZUEEsofNBiR5O_1htw4PuGyNHekWLRAdYv4ruD56jvL9MU9ApQ7EJbuZ72ibVfWkbTLRgsikfBvlnjo16wEG3xU2SxiCm9iBmbDFyAtCqmrLT966vCQ-90_jgamMvlJWzY4wc_QFMrnc3tVhBARtsLMMGvg6FNf1GBI4bzTRkndmq2GuKfW5DFFjNacnfSnbjL6Py4LJhL7NEJPbvU9EqmpGynFlNETHrT16Am-cDFoGh3G1p1reGRYrgqGODvURUwg47wUpOrjDEicb9P4IGYSlVdI4MoPV5smM8hPkt0UifpkHQ'

  useEffect(() => {
    if (!capstone) {
      dispatch(capstoneActions.fetchSingleCapstone(capstoneId));
    } else {
      const headers = {
        Authorization: `Bearer ${mgmtApiAccessToken}`,
      };

      const apiEndpoint = `/api/v2/users/${capstone.author}`;

      axios
        .get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}${apiEndpoint}`, { headers })
        .then((response) => {
          setAuthor(response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [capstone, dispatch]);

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
                    alt={`${author.nickname}`}
                  />
                </div>
                <h2
                  className='heading'
                >
                  {author.nickname}
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
                        <a href={`mailto:${author.email}`} target="_blank" rel="noopener noreferrer">
                          <EmailIcon />
                        </a>
                      )}

                      {author.github && (
                        <a href={author.github && !author.github.startsWith('http') ? `http://${author.github}` : author.github} target="_blank" rel="noopener noreferrer">
                          <GitHubIcon />
                        </a>
                      )}

                      {author.linkedin && (
                        <a href={author.linkedin.startsWith('https://') ? author.linkedin : `https://${author.linkedin}/`} target="_blank">
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
          <ReviewRender capstoneId={capstone.id} ownerId={author.user_id} />
        </section>
      </div>
    </>
  );
}

export default CapstoneDetails;
