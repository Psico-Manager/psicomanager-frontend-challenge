import { useState, useRef } from 'react';
import StepWizard from './components/StepWizard';
import Layout from './components/Layout';
import Modal from './components/Modal';
import ClientForm from './components/ClientForm';
import EmailMessageEditor from './components/EmailForm';
import PsicoBankPayments from './components/PaymentForm';
import { FormDataProvider, useFormData } from './context/FormDataContext';

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
