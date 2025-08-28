import React, { useState, useCallback } from "react";
import { Sidebar, Header } from "./components/custom";
import { ActivatePsicoBankModal } from "./features/wizard";
import { Button } from "./components/ui/Button";
import { Toaster } from "react-hot-toast";
import {
  AppGrid,
  ContentGrid,
  MainContent,
  SidebarWrapper,
  WelcomeTitle,
  InformationText
} from "./styles/App.styles";
import psigoIagoImage from "./assets/psigo-iago.png";

export default function App() {
  const [isPsicoBankModalOpen, setIsPsicoBankModalOpen] = useState(false);
  const [isPsicoBankActivated, setIsPsicoBankActivated] = useState(false);

  const handleOpenPsicoBankModal = useCallback(() => {
    setIsPsicoBankModalOpen(true);
  }, []);

  const handleClosePsicoBankModal = useCallback(() => {
    setIsPsicoBankModalOpen(false);
  }, []);

  const handlePsicoBankSuccess = useCallback(() => {
    setIsPsicoBankActivated(true);
  }, []);

  return (
    <>
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
          },
        }}
      />
      <AppGrid>
        <Header />
        <ContentGrid>
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
          <MainContent>
            <img 
              src={psigoIagoImage} 
              alt="Psigo Iago" 
              style={{ 
                width: "130px", 
                height: "130px", 
                objectFit: "contain",
                marginBottom: "16px"
              }} 
            />
            <WelcomeTitle>
              {isPsicoBankActivated ? "Parabéns!" : "Olá!"}
            </WelcomeTitle>
            <InformationText>
              {isPsicoBankActivated 
                ? "O Psicobank foi ativado! Aguarde os próximos passos!"
                : "Clique no botão para começar a usar os benefícios financeiros do PsicoManager!"
              }
            </InformationText>
            {!isPsicoBankActivated && (
              <Button 
                onClick={handleOpenPsicoBankModal}
                aria-label="Ativar o PsicoBank"
                style={{ 
                  padding: "6px 20px",
                  height: "auto"
                }}
              >
                Ativar o PsicoBank
              </Button>
            )}
          </MainContent>
        </ContentGrid>
        {isPsicoBankModalOpen && (
          <ActivatePsicoBankModal 
            onClose={handleClosePsicoBankModal}
            onSuccess={handlePsicoBankSuccess}
          />
        )}
      </AppGrid>
    </>
  );
}
