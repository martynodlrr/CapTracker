import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import './index.css'

function CapstoneImages({ images, capstoneId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    history.push(`/capstones/${capstoneId}`);
  };

  return (
    <div className='capstones'>
      {images.length > 0 && (
        <>
          <button onClick={prevImage}>Previous</button>
          <div key={images[currentIndex].id} onClick={handleImageClick}>
            <img src={images[currentIndex].imageUrl} alt={`Image ${images[currentIndex].id}`} />
          </div>
          <button onClick={nextImage}>Next</button>
        </>
      )}
    </div>
  );
}

export default CapstoneImages;
