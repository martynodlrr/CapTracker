import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as capstoneActions from '../../../store/capstones';

import './index.css';

function CreateCapstone() {
  const userCapstone = useSelector((state) => state.capstones.userCapstone);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
console.log(state.capstones)
console.log(state.capstones)
  const [previewSrc, setPreviewSrc] = useState(Array(5).fill(null));
  const [images, setImages] = useState(Array(5).fill(null));
  const [title, setTitle] = useState(userCapstone?.title || '');
  const [url, setUrl] = useState(userCapstone?.url || '');
  const [description, setDescription] = useState(userCapstone?.description || '');
  const [clonedFrom, setClonedFrom] = useState(userCapstone?.clonedFrom || '');
  const [formType, setFormType] = useState(userCapstone ? 'update' : 'create');
  const [disabled, setDisabled] = useState(false);

    const handleFileChange = (index) => (e) => {
      const file = e.target.files[0];
      if (file) {
        setImages((prev) => {
          const updated = [...prev];
          updated[index] = file;
          return updated;
        });
        const src = URL.createObjectURL(file);
        setPreviewSrc((prev) => {
          const updated = [...prev];
          updated[index] = src;
          return updated;
        });
      } else {
        setPreviewSrc((prev) => {
          const updated = [...prev];
          updated[index] = userCapstone?.capstoneImages[index] || null;
          return updated;
        });
      }
    };

    useEffect(() => {
      setDisabled(
        title.length > 50 || url.length > 150 || description.length > 200,
        );
      }, [title, url, description]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        const capstone = {
          title,
          url,
          description,
          images,
        };

        if (formType === 'create') {
          dispatch(capstoneActions.createCapstone(capstone));
        } else {
          dispatch(capstoneActions.updateCapstone(userCapstone.id, capstone));
        }

        console.log(capstone);
      };

        useEffect(() => {
          setFormType(userCapstone ? 'update' : 'create');
        }, [userCapstone]);

      useEffect(() => {
        dispatch(capstoneActions.fetchUserCapstone());
      }, [dispatch]);

  const FileInput = ({ index }) => (
    <div className="file-input-container" key={index}>
      <span className="pfp-render">
        <img src={previewSrc[index]} alt={`Capstone Image Preview ${index}`} id={`profile-picture-${index}`} />
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
            type="text"
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
          <FileInput key={index} index={index} />
        ))}

        <button type="submit" className="form-submit" disabled={disabled}>{ formType ? `Post` : 'Update' }</button>
      </form>
    </>
  );
}

export default CreateCapstone;
