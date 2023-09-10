import React, { useState } from 'react';
import './index.css';

function CapstoneImages({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      {images.length > 0 && (
        <>
          <button onClick={prevImage}>Previous</button>
          <div key={images[currentIndex].id}>
            <img src={images[currentIndex].imageUrl} alt={`Image ${images[currentIndex].id}`} />
          </div>
          <button onClick={nextImage}>Next</button>
        </>
      )}
    </div>
  );
}

function RenderCapstone({ capstone }) {
  return (
    <div>
      <h1>{capstone.title}</h1>
      <p>{capstone.created_at}</p>
      <a href={capstone.url} target="_blank">
        Visit project
      </a>

      <CapstoneImages images={capstone.capstone_images} />

      <p>{capstone.description}</p>
    </div>
  );
}

export default RenderCapstone;
