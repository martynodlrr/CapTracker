import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { useState } from 'react'
import ReactGA from 'react-ga'

import StyledTextareaAutosize from '../../TextareaInput/index.js'
import * as reviewActions from '../../../store/review'

function CreateReview({ create, capstoneId, closeModal, reviewId, text, nickname }) {
  const [review, setReview] = useState(!create ? text : '')
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()

    ReactGA.event({
      category: 'Review',
      action: 'Submitted a review',
    })

    const comment = {
      review,
    }

    if (create) {
      await dispatch(reviewActions.createReview(comment, capstoneId, nickname))
    } else {
      comment['id'] = reviewId
      await dispatch(reviewActions.postUpdateReview(comment))
    }

    closeModal()
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className='capstone-form'
      style={{
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '10px',
        padding: '20px 10px',
      }}>
      <div className="form-field">
        <StyledTextareaAutosize
          label="Review"
          variant="filled"
          onChange={(e) => setReview(e.target.value)}
          value={review}
          required
          theme={theme}
          maxLength={1000}
          style={{
            maxWidth: '1100px',
            height: '125px'
          }}
          placeholder='Write your review here'
        />
      </div>

      <Button
        type="submit"
        variant='outlined'
        className='btn'
      >{create ? 'post' : 'update'}</Button>
    </form>
  )
}

export default CreateReview
