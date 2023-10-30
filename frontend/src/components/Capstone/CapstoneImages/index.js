import { ArrowBack, ArrowForward } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import ReactGA from 'react-ga';

import './index.css'

function CapstoneImages({ images, capstoneId, link }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    ReactGA.event({
      category: 'Capstone',
      action: `Capstone Image Clicked for ${capstoneId}`,
    });

    history.push(`/capstones/${capstoneId}#root`);
  };

  return (
    <div className='capstone-images'>
      {images && images.length > 0 && (
        <><IconButton
          style={currentIndex === 0 ? { visibility: 'hidden' } : { visibility: 'visible' }}
        >
          <ArrowBack
            onClick={prevImage}
          />
        </IconButton>
          <div
            key={images[currentIndex].id}
            className={capstoneId ? 'capstone-image' : 'capstone-image-render'}
            onClick={handleImageClick}
          >
            <a>
              {link ? (
                <a
                  target="_blank"
                  href={link}
                  title={link}
                >
                  <img
                    className='capstone-img-render'
                    src={images[currentIndex].imageUrl}
                    alt={`Capstone Website Preview #${currentIndex + 1}`}
                  />
                </a>
              ) : (
                <img
                  className='capstone-img-render'
                  src={images[currentIndex].imageUrl}
                  alt={`Capstone Website Preview #${currentIndex + 1}`}
                />
              )}
            </a>
          </div>
          <IconButton
            style={currentIndex === images.length - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }}
          >
            <ArrowForward
              onClick={nextImage}
            />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default CapstoneImages;
