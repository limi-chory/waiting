import React, { PropsWithChildren } from 'react'

import styles from '@style/Popup.module.css'

interface ModalPopupProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

export const ModalPopup = ({ isOpen, onClose, children }: ModalPopupProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton} onClick={onClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  )
}
