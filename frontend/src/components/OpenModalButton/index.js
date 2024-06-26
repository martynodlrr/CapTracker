import Button from '@mui/material/Button'
import React from 'react'

import { useModal } from '../../context/Modal'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal()

  const handleClick = () => {
    if (onModalClose) setOnModalClose(onModalClose)
    setModalContent(modalComponent)
    if (onButtonClick) onButtonClick()
  }

  return (
    <Button
      className='btn'
      variant="outlined"
      onClick={handleClick}
    >{buttonText}</Button>
  )
}

export default OpenModalButton
