import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 40;
  @media (max-width: 900px) {
    align-items: start; /* garante que modal comece do topo */
    padding-top: 48px; /* espaço do topo no mobile */
    overflow-y: auto; /* scroll caso modal seja maior que tela */
  }
`;
export const ModalBox = styled.div`
  width: 100%;
  max-width: 880px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  overflow: hidden;
`;
/* export const ModalHeader = styled.div`
  padding: 16px 20px; border-bottom: 1px solid ${({theme})=> theme.colors.border};
  display:flex; justify-content:space-between; align-items:center;
` */
export const ModalHeader = styled.div`
  padding: 16px 20px 36px 20px; /* top:16px, right:20px, bottom:24px, left:20px */
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ModalBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  /* Scroll vertical quando necessário */
  max-height: calc(
    100vh - 150px
  ); /* ajusta conforme altura do header e padding */
  overflow-y: auto;

  /* Garantir que os forms e grids fiquem empilhados em telas menores */
  @media (max-width: 900px) {
    & > form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`;
