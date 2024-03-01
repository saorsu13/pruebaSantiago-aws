import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ModalStyle.css';

const Modal = ({ isOpen, onClose, message, color }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content" style={{ borderColor: color, color: color }}>
          <span className="close" onClick={onClose}>&times;</span>
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Modal;
