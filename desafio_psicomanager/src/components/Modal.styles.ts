import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    align-items: flex-start;
  }
`;

export const ModalCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden; /* ← Evita scroll horizontal */

  /* Garante que o conteúdo interno não ultrapasse */
  min-width: 300px;
  min-height: 300px;

  /* Layout flexível para o conteúdo */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Responsividade */
  @media (max-width: 768px) {
    width: 95%;
    min-width: 280px;
    padding: 20px;
    max-height: 95vh;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    width: 98%;
    min-width: 260px;
    padding: 15px;
    min-height: 280px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
  z-index: 1;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 25px;
    height: 25px;
    top: 10px;
    right: 10px;
  }
`;
