import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useFormData } from '../context/FormDataContext';

const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Description = styled.p`
  background-color: #e6f7ff;
  color: #0066cc;
  padding: 12px;
  border-radius: 4px;
  margin: 12px 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #f5f5f5;
  color: #333;
`;

const CheckboxGroup = styled.div`
  margin: 12px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 8px 0;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 8px;
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ddd;
`;

// Main Component
const PsicoBankPayments = () => {
  const { formData, updatePaymentData } = useFormData();
  const [professional, setProfessional] = useState('João Silva');
  const [paymentMethods, setPaymentMethods] = useState({
    pix: true,
    creditCard: false,
    boleto: false,
  });
  const [applyFine, setApplyFine] = useState(false);
  const [fineValue, setFineValue] = useState('0.0');
  const [applyInterest, setApplyInterest] = useState(false);

  // Atualizar dados no contexto quando houver mudanças
  const debouncedUpdate = useCallback(
    debounce((data) => {
      updatePaymentData(data);
    }, 300),
    [updatePaymentData]
  );

  // Evitar atualização infinita ao inicializar
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setProfessional(formData.paymentData.professional);
      setPaymentMethods(formData.paymentData.paymentMethods);
      setApplyFine(formData.paymentData.applyFine);
      setFineValue(formData.paymentData.fineValue);
      setApplyInterest(formData.paymentData.applyInterest);
      setIsInitialized(true);
    } else {
      debouncedUpdate({ 
        professional, 
        paymentMethods, 
        applyFine, 
        fineValue, 
        applyInterest 
      });
    }
  }, [professional, paymentMethods, applyFine, fineValue, applyInterest, debouncedUpdate, formData.paymentData, isInitialized]);

  const handlePaymentChange = (method: string) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [method]: !prev[method as keyof typeof prev],
    }));
  };

  return (
    <Container>
      <Title>Preencha os itens a seguir para configurar o PsicoBank</Title>

      <div style={{ marginBottom: '20px' }}>
        <Label>
          Profissional: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Select
          value={professional}
          disabled
          onChange={(e) => setProfessional(e.target.value)}
        >
          <option value='João Silva'>João Silva</option>
          {/* Adicione mais opções conforme necessário */}
        </Select>
      </div>

      <Title>Forma de pagamento da cobrança</Title>
      <Description>
        Escolha quais as opções de pagamento que estarão disponíveis para o seu
        cliente no link das mensagens de cobrança.
      </Description>

      <Label>
        Disponibilizar meios de pagamento:
        <span style={{ color: 'red' }}>*</span>
      </Label>

      <CheckboxGroup>
        <CheckboxLabel>
          <CheckboxInput
            type='checkbox'
            checked={paymentMethods.pix}
            onChange={() => handlePaymentChange('pix')}
          />
          Pix
        </CheckboxLabel>
        <CheckboxLabel>
          <CheckboxInput
            type='checkbox'
            checked={paymentMethods.creditCard}
            onChange={() => handlePaymentChange('creditCard')}
          />
          Cartão de crédito
        </CheckboxLabel>
        <CheckboxLabel>
          <CheckboxInput
            type='checkbox'
            checked={paymentMethods.boleto}
            onChange={() => handlePaymentChange('boleto')}
          />
          Boleto Bancário
        </CheckboxLabel>
      </CheckboxGroup>

      <Divider />

      <Label>
        Definir multas e juros para todos os boletos após o vencimento
      </Label>

      <CheckboxGroup>
        <CheckboxLabel>
          <CheckboxInput
            type='checkbox'
            checked={applyFine}
            onChange={() => setApplyFine(!applyFine)}
          />
          Cobrar multa
        </CheckboxLabel>

        {applyFine && (
          <div>
            <Label>Valor da multa em %:</Label>
            <Input
              type='number'
              step='0.01'
              value={fineValue}
              onChange={(e) => setFineValue(e.target.value)}
            />
          </div>
        )}

        <CheckboxLabel>
          <CheckboxInput
            type='checkbox'
            checked={applyInterest}
            onChange={() => setApplyInterest(!applyInterest)}
          />
          Cobrar juros por dia de atraso (valor 1% ao mês)
        </CheckboxLabel>
      </CheckboxGroup>
    </Container>
  );
};

// Função de debounce para evitar atualizações frequentes
function debounce<F extends (...args: any[]) => any>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export default PsicoBankPayments;
