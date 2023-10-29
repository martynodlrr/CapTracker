import { TextField, Button, Container } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import * as capstoneActions from '../../../store/capstone';
import StyledTextareaAutosize from '../../TextareaInput/index.js';
import ReviewRender from '../../Review/ReviewRender';

import './index.css';

function CreateCapstone() {
  const userCapstone = useSelector((state) => state.capstones.userCapstone);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const history = useHistory();

  const placeholderImage = 'https://captracker.s3.amazonaws.com/c1ecf04b53b14ef598c50640fa8e5510.png';

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [description, setDescription] = useState('');
  const [clonedFrom, setClonedFrom] = useState('');
  const [previewSrc, setPreviewSrc] = useState(Array(5).fill(placeholderImage));
  const [images, setImages] = useState(Array(5).fill(null));
  const [create, setCreate] = useState(true);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(capstoneActions.fetchUserCapstone(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (userCapstone) {
      setTitle(userCapstone.title);
      setUrl(userCapstone.url);
      setDescription(userCapstone.description);
      setClonedFrom(userCapstone.clonedFrom);

      if (userCapstone.capstoneImages) {
        const updatedPreviewSrc = userCapstone.capstoneImages.map(
          (img) => img.imageUrl || placeholderImage
        );
        setPreviewSrc((prev) => [
          ...updatedPreviewSrc,
          ...prev.slice(updatedPreviewSrc.length),
        ]);
      }

      setCreate(Object.keys(userCapstone).length > 0 ? false : true);
      setLoading(false);
    }
  }, [userCapstone]);

  useEffect(() => {
    if (userCapstone && title && url && description && clonedFrom && Object.keys(userCapstone).length) {
      setDisabled(
        title.length > 50 ||
        url.length > 150 ||
        description.length > 1000 ||
        clonedFrom.length > 75
      );
    }
  }, [title, url, description, clonedFrom, userCapstone]);

  const handleFileChange = (index) => (e) => {
    ReactGA.event({
      category: 'Capstone',
      action: 'Capstone Image Uploaded'
    });

    const file = e.target.files[0];

    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    if (file) {
      const src = URL.createObjectURL(file);
      setPreviewSrc((prev) => {
        const updated = [...prev];
        updated[index] = src;
        return updated;
      });
    } else {
      setPreviewSrc((prev) => {
        const updated = [...prev];
        updated[index] = userCapstone?.capstoneImages[index]?.imageUrl || placeholderImage;
        return updated;
      });
    }
  };

  const handleUrlChange = (e) => {
    const inputValue = e.target.value;
    setUrl(inputValue);

    // Regular expression for URL validation
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isValid = urlRegex.test(inputValue);

    setIsValidUrl(isValid);
  }

  const FileInput = ({ index }) =>
  (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <span>
        <img
          src={previewSrc[index]}
          alt={`Capstone Website Preview #${index}`}
          id={`profile-picture-${index}`}
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      </span>


      <input
        accept="image/*"
        id={`file-input-${index}`}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange(index)}
      />
      <label htmlFor={`file-input-${index}`}>
        <IconButton
          aria-label="upload picture"
          component="span"
          sx={{
            backgroundColor: 'white',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
            '& .MuiSvgIcon-root': {
              transition: 'background-color 0.3s, color 0.3s',
            },
            '&:hover .MuiSvgIcon-root': {
              backgroundColor: 'primary.main',
              color: 'secondary.main',
            }
          }}
        >
          <PhotoCamera color="primary" sx={{
            backgroundColor: 'white'
          }} />
        </IconButton>
      </label>
    </div>
  );

  const uploadImages = async (capstoneId, images, capstoneImages = []) => {
    await Promise.all(images.map((image, index) => {
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        if (capstoneImages[index]) {
          const imageId = capstoneImages[index].id;
          return dispatch(capstoneActions.updateCapstoneImage(capstoneId, imageId, formData));
        } else {
          return dispatch(capstoneActions.createCapstoneImage(capstoneId, formData));
        }
      }
      return null;
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasAtLeastOneImage = images.some(image => image !== null);
    const capstone = {
      title,
      url,
      description,
      images,
      clonedFrom,
    };

    if (create) {
      if (!hasAtLeastOneImage) {
        setErrors(["At least one image is required to create a capstone."]);
        return;
      }

      const createdCapstone = await dispatch(capstoneActions.createCapstone(capstone));

      if (!createdCapstone.errors) {
        await uploadImages(createdCapstone.id, images);
        history.push(`/capstones/${createdCapstone.id}`);

      } else {
        setErrors(createdCapstone.errors);
      }
    } else {
      capstone.id = userCapstone.id;

      const updateRes = await dispatch(capstoneActions.updateCapstone(capstone));

      if (!updateRes.errors) {
        await uploadImages(capstone.id, images, userCapstone.capstoneImages);
        const res = await dispatch(capstoneActions.fetchUserCapstone());
        history.push(`/capstones/${res.id}`);

      } else {
        setErrors(updateRes.errors);
      }
    }
  };

  const handleDelete = async (e, capstoneId) => {
    e.preventDefault();

    history.push('/capstones');
    await dispatch(capstoneActions.deleteCapstone(capstoneId));
  };

  if (loading) {
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
    <Container>
      <h1 className='heading'>{create ? 'Create a new capstone' : 'Edit your capstone'}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title of project"
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              color: 'black',
            },
            '& .MuiFilledInput-input': {
              color: 'black',
            },
            '& .MuiInputLabel-filled': {
              color: 'black',
            }
          }}
        />

        <TextField
          label="Website URL"
          variant="filled"
          onChange={handleUrlChange}
          value={url}
          required
          error={!isValidUrl}
          helperText={!isValidUrl ? 'Invalid URL' : ''}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              color: 'black',
            },
            '& .MuiFilledInput-input': {
              color: 'black',
            },
            '& .MuiInputLabel-filled': {
              color: 'black',
            },
          }}
        />

        <TextField
          label="Site Cloned From"
          variant="filled"
          onChange={(e) => setClonedFrom(e.target.value)}
          value={clonedFrom}
          required
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              color: 'black',
            },
            '& .MuiFilledInput-input': {
              color: 'black',
            },
            '& .MuiInputLabel-filled': {
              color: 'black',
            }
          }}
        />

        <StyledTextareaAutosize
          label="Description"
          variant="filled"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={1000}
          required
        />

        {errors.includes('At least one image is required to create a capstone.') && (
          <p className='error-display'>
            At least one image must be uploaded
          </p>
        )}

        <h2 htmlFor="images" className='heading'>Upload Images: </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem'
          }}>
          {[...Array(5)].map((_, index) => (
            previewSrc[index] ? <FileInput key={index} index={index} /> : null
          ))}
        </div>

        <div
          className='btn'
          style={{
            display: 'flex',
            gap: '1rem'
          }}
        >
          <Button type="submit" variant="contained" color="primary" disabled={disabled}>
            {create ? `Post capstone` : 'Update capstone'}
          </Button>
          {!create && (
            <Button variant="contained" color="secondary" onClick={(e) => handleDelete(e, userCapstone.id)}>
              Delete
            </Button>
          )}
        </div>
      </form>

      <h2 className='heading'>See what others are suggesting: </h2>
      <ReviewRender capstoneId={userCapstone?.id} create={create} capstoneAlter={true} ownerId={userCapstone?.author?.id} />
    </Container>
  );
}

export default CreateCapstone;
