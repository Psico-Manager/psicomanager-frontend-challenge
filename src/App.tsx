import React, { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./components/Sidebar";
import { ActivatePsicoBankModal } from "./components/ActivatePsicoBankModal";
import { Button } from "./components/primitives/Button";
import { Header } from "./components/header";
import { Toaster } from "react-hot-toast";
import IconMain from "./icons/icon-main";

const AppGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr; // largura da sidebar responsiva
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.space(2)};
  height: 100%; // ocupa toda a altura disponível
  gap: 8px;
`;

const SidebarWrapper = styled.div`
  @media (max-width: 900px) {
    display: none; // esconde sidebar em telas menores
  }
`;

const InfoText = styled.span`
  font-size: 1rem;
  color: #374151;
  margin-bottom: 4px;
`;

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppGrid>
        <Header />
        <ContentGrid>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <Main>
            <IconMain />
            <h1>Olá</h1>

            <InfoText>
              Clique no botão para começar a<br></br> usar os benefícios
              financeiros <br></br>do PsicoManager!
            </InfoText>
            <Button onClick={() => setOpen(true)}>Ativar o PsicoBank</Button>
          </Main>
        </ContentGrid>
        {open && <ActivatePsicoBankModal onClose={() => setOpen(false)} />}
      </AppGrid>
    </>
  );
}
