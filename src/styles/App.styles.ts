import styled from "styled-components";

export const AppGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space(2)};
  height: 100%;
  gap: ${({ theme }) => theme.space(2)};
`;

export const SidebarWrapper = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export const WelcomeTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

export const InformationText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  line-height: 1.5;
  max-width: 225px;
`;
