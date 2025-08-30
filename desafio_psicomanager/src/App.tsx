import { useState, useRef } from 'react';
import StepWizard from './components/StepWizard';
import Layout from './components/Layout';
import Modal from './components/Modal';
import ClientForm from './components/ClientForm';
import EmailMessageEditor from './components/EmailForm';
import PsicoBankPayments from './components/PaymentForm';
import { FormDataProvider, useFormData } from './context/FormDataContext';
import styled from 'styled-components';

// Container principal
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
`;

// Estilização da imagem do robô
const RobotImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

// Container de texto
const TextContent = styled.div`
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 1rem;
    max-width: 300px;
    margin-bottom: 30px;
    line-height: 1.5;
  }
`;

// Botão estilizado
const ActivateButton = styled.button`
  background-color: #3467c8;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2a55b0;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    'financeiro' | 'formulario' | 'lista'
  >('financeiro');

  const { formData } = useFormData();
  const clientFormRef = useRef<{ validate: () => boolean }>(null);

  const steps = [
    {
      title: 'Cadastrar uma conta',
      content: (
        <>
          <ClientForm ref={clientFormRef} />
        </>
      ),
      validator: () => {
        if (clientFormRef.current) {
          return clientFormRef.current.validate();
        }
        return true;
      },
    },
    {
      title: 'Canais de envio e Mensagem de cobrança',
      content: (
        <>
          <EmailMessageEditor />
        </>
      ),
    },
    {
      title: 'Forma de pagamento',
      content: (
        <>
          <PsicoBankPayments />
        </>
      ),
    },
  ];

  const handleOpenFinanceiroModal = () => {
    setModalContent('financeiro');
    setIsModalOpen(true);
  };

  const handleFinish = () => {
    console.log('Dados completos do formulário:', formData);
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'financeiro':
        return (
          <>
            <h2>Ativar o PsicoBank</h2>
            <StepWizard
              callback={(value: boolean) => setIsModalOpen(value)}
              steps={steps}
              onFinish={handleFinish}
            />
          </>
        );

      case 'formulario':
        return (
          <>
            <h1>teste</h1>
          </>
        );
    }
  };

  return (
    <Layout onOpenFinanceiroModal={handleOpenFinanceiroModal}>
      <WelcomeContainer>
        {/* Imagem central do robô */}
        <RobotImage
          src='src/assets/4-PSICO-IAGO.png' // Substitua pelo caminho real da imagem
          alt='Robô PsicoManager'
        />

        {/* Texto de boas-vindas */}
        <TextContent>
          <h2>Olá!</h2>
          <p>
            Clique no botão para começar a usar os benefícios financeiros do
            PsicoManager!
          </p>
        </TextContent>

        {/* Botão */}
        <ActivateButton onClick={() => setIsModalOpen(true)}>
          Ativar o PsicoBank
        </ActivateButton>
      </WelcomeContainer>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {renderModalContent()}
        </Modal>
      )}
    </Layout>
  );
}

function App() {
  return (
    <FormDataProvider>
      <AppContent />
    </FormDataProvider>
  );
}

export default App;
