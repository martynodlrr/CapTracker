import React from 'react';

import CapstoneImages from '../CapstoneImages';

import './index.css';

function RenderCapstone({ capstone }) {
  return (
    <div className='capstones'>
      <h1>{capstone.title}</h1>
      <p>{capstone.created_at}</p>
      <a href={capstone.url} target="_blank" rel="noopener noreferrer">
        {/* rel="noopener" instructs the browser to open the link in a new process or tab without giving the new page access to the window.opener property ( protects from phishing ) */}
        {/* rel="noreferrer" prevents the browser from sending an HTTP referrer header ( prevents websites from tracking user activity ) */}
        Visit project
      </a>

      <CapstoneImages images={capstone.capstoneImages} capstoneId={capstone.id} />

      <p>{capstone.description}</p>
    </div>
  );
}

export default RenderCapstone;
