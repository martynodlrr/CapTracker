import { useDispatch, useSelector } from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
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
      <div className="CapstoneDetails">
        <div id='capstone'>
          <h1>{capstone.title}</h1>

          <section>
            <CapstoneImages images={capstone.capstoneImages} capstoneId={capstone.id} />
          </section>

          <section>
            <p>About: {capstone.description}</p>
            <p>Site Cloned: {capstone.clonedFrom}</p>
            <a href={capstone.url} target="_blank" rel="noopener noreferrer">
              Visit project
            </a>
          </section>

        </div>
        <div id='author'>
          <section>
            <h2>Author: </h2>
            {capstone.author && (
              <>
                <img src={capstone.author.pfp} alt={`${capstone.author.firstName} ${capstone.author.lastName}`} />
                <p>Name: {capstone.author.firstName} {capstone.author.lastName}</p>
                <p>Email: {capstone.author.email}</p>
                <p>Username: {capstone.author.userName}</p>
                {capstone.author.GitHub ?
                  <p>
                    <a href={capstone.author.GitHub && !capstone.author.GitHub.startsWith('http') ? `http://${capstone.author.GitHub}` : capstone.author.GitHub} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                  </p>
                  : null}
                {capstone.author.LinkedIn ?
                  <p>

                    <a href={capstone.author.LinkedIn && !capstone.author.LinkedIn.startsWith('http') ? `http://${capstone.author.LinkedIn}` : capstone.author.LinkedIn} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </p>
                  : null}
              </>
            )}
          </section>
        </div>
      </div>

      <div>
        <section>
          <h2>Comments: </h2>
          <ReviewRender ownerId={capstone.author.id} capstoneId={capstone.id} />
        </section>
      </div>
    </>
  );
}

export default CapstoneDetails;
