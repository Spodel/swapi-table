import React from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Delete this character?</h2>
        <div className={styles.modalButtons}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
