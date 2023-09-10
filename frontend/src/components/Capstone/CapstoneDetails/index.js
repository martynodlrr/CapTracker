import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import * as capstoneActions from '../../../store/capstones';
import CapstoneImages from '../CapstoneImages';

function CapstoneDetails() {
  const dispatch = useDispatch();
  const { capstoneId } = useParams();
  const capstone = useSelector(state => state.capstones[capstoneId]);

  useEffect(() => {
    if (!capstone) {
      dispatch(capstoneActions.fetchSingleCapstone(capstoneId));
    }
  }, [capstone, capstoneId, dispatch]);

  if (!capstone) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{capstone.title}</h1>

      <section>
        <h2>Images</h2>
        <CapstoneImages images={capstone.capstoneImages} capstoneId={capstone.id} />
      </section>

      <section>
        <h2>Project Details</h2>
        <p>Created At: {capstone.created_at && new Date(capstone.created_at).toLocaleString()}</p>
        <p>Description: {capstone.description}</p>
        <a href={capstone.url} target="_blank" rel="noopener noreferrer">
          Visit project
        </a>
      </section>

      <section>
        <h2>Author Details</h2>
        {capstone.author && (
          <>
            <img src={capstone.author.pfp} alt={`${capstone.author.firstName} ${capstone.author.lastName}`} />
            <p>Name: {capstone.author.firstName} {capstone.author.lastName}</p>
            <p>Email: {capstone.author.email}</p>
            <p>Username: {capstone.author.username}</p>
          </>
        )}
      </section>

      <section>
        <h2>Comments</h2>
        {/* {capstone.comments && capstone.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.username}: {comment.text}</p>
            <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ))} */}
      </section>
    </div>
  );
}

export default CapstoneDetails;
