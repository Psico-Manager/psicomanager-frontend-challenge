import styled from 'styled-components';

export const Backdrop = styled.div`
  z-index: 40;
  position: fixed;
  inset: 0;
  padding: ${({ theme }) => theme.space(4)};
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.overlay};

  @media (max-width: 900px) {
    overflow-y: auto;
    align-items: start;
    padding-top: ${({ theme }) => theme.space(12)};
  }
`;

export const ModalBox = styled.div`
  overflow: hidden;
  max-width: 880px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 900px) {
    max-height: calc(100vh - ${({ theme }) => theme.space(24)});
  }
`;

export const ModalHeader = styled.div`
  gap: ${({ theme }) => theme.space(4)};
  flex-direction: column;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space(4)} ${({ theme }) => theme.space(5)}
    ${({ theme }) => theme.space(9)} ${({ theme }) => theme.space(5)};

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.space(4)};
  }
`;

export const ModalBody = styled.div`
  scroll-behavior: smooth;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  gap: ${({ theme }) => theme.space(3)};
  flex-direction: column;
  display: flex;
  padding: ${({ theme }) => theme.space(4)};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.border};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.muted};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 900px) {
    gap: ${({ theme }) => theme.space(2)};
    padding: ${({ theme }) => theme.space(3)};

    & > form {
      gap: ${({ theme }) => theme.space(3)};
      flex-direction: column;
      display: flex;
    }
  }
`;
