import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import * as capstoneActions from '../../../store/capstones';

import './index.css';

function CreateCapstone() {
  const userCapstone = useSelector((state) => state.capstones.userCapstone);
  const dispatch = useDispatch();

  const placeholderImage = 'https://www.dcm.co.za/wp-content/uploads/2019/11/placeholder-image-icon-21.jpg';

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [clonedFrom, setClonedFrom] = useState('');
  const [previewSrc, setPreviewSrc] = useState(Array(5).fill(placeholderImage));
  const [images, setImages] = useState(Array(5).fill(null));
  const [create, setCreate] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(capstoneActions.fetchUserCapstone());
  }, [dispatch]);

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

      setCreate(Object.keys(userCapstone).length ? false : true);
      setLoading(false);
    }
  }, [userCapstone]);

  useEffect(() => {
    if (userCapstone && title && url && description && clonedFrom && Object.keys(userCapstone).length) {
      setDisabled(
        title.length > 50 ||
        url.length > 150 ||
        description.length > 200 ||
        clonedFrom.length > 75
      );
    }
  }, [title, url, description, clonedFrom, userCapstone]);

  const handleFileChange = (index) => (e) => {
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

  const FileInput = ({ index }) => (
    <div className="file-input-container" key={index}>
      <span>
        <img className="capstone-img-render" src={previewSrc[index]} alt={`Capstone Website Preview #${index}`} id={`profile-picture-${index}`} />
      </span>


      <button type="button" className="file-select-button" onClick={() => document.getElementById(`pfp-input-${index}`).click()}>
        Select File
      </button>
      <input
        id={`pfp-input-${index}`}
        className="profile-input-hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange(index)}
      />
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

    const capstone = {
      title,
      url,
      description,
      images,
      clonedFrom,
    };

    if (create) {
      const createdCapstone = await dispatch(capstoneActions.createCapstone(capstone));
      if (createdCapstone) {
        await uploadImages(createdCapstone.id, images);
        await dispatch(capstoneActions.fetchUserCapstone());
      }
    } else {
      capstone.id = userCapstone.id;
      await uploadImages(capstone.id, images, userCapstone.capstoneImages);
      await dispatch(capstoneActions.updateCapstone(capstone));
      await dispatch(capstoneActions.fetchUserCapstone());
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data" id='capstone-form'>
        <div className="form-field">
          <label htmlFor="title" className='capstone-label'>Title of project</label>
          <input
            id="title"
            className='capstone-input'
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="url" className='capstone-label'>Website URL</label>
          <input
            id="url"
            className='capstone-input'
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Website URL"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description" className='capstone-label'>Description</label>
          <input
            id="description"
            className='capstone-input'
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="clonedFrom" className='capstone-label'>Site Cloned From</label>
          <input
            id="clonedFrom"
            className='capstone-input'
            type="text"
            onChange={(e) => setClonedFrom(e.target.value)}
            value={clonedFrom}
            placeholder="Site Cloned From"
            required
          />
        </div>

        {[...Array(5)].map((_, index) => (
          previewSrc[index] ? <FileInput key={index} index={index} /> : null
        ))}

        <button type="submit" className="form-submit" disabled={disabled}>{create ? `Post` : 'Update'}</button>
      </form>
    </>
  );
}

export default CreateCapstone;
