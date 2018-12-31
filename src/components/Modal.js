import React from 'react'
import Modal from 'react-modal'

export default ({ isOpen, closeModal, body }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{}}>
      {isOpen && body}
    </Modal>
  )
}