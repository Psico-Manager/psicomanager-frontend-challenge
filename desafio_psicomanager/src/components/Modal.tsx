import React, { useEffect, useRef } from 'react';
import { ModalOverlay, ModalCard, CloseButton } from './Modal.styles';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Fechar ao clicar fora
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Impedir fechamento ao clicar dentro do modal
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick} ref={modalRef}>
      <ModalCard onClick={handleModalClick}>
        <CloseButton onClick={onClose} aria-label='Fechar modal'>
          ×
        </CloseButton>
        {children}
      </ModalCard>
    </ModalOverlay>
  );
};

export default Modal;
