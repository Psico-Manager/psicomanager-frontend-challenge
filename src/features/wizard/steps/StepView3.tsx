import React, { useEffect, memo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";

import { Step3, step3Schema } from "../validation/schemas";
import { FieldWrap, Label, InputBase, Helper } from "../../../components/ui/InputField";
import { Button } from "../../../components/ui/Button";

const PAYMENT_METHODS = ["PIX", "Cartão de crédito", "Boleto Bancário"] as const;

const MethodsContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
  margin-bottom: 16px;
`;

const MethodLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #6b7280;

  input {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primaryHover};
    background-color: #f3f4f6;
    border-radius: 4px;
  }
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-top: 12px;

  input {
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SectionLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

interface Step3ViewProps {
  profissional: string;
  defaultValues?: Step3;
  onCancel: () => void;
  onSubmit: (data: Step3) => void;
  onProgress?: (progress: number) => void;
  isSubmitting?: boolean;
}

export const Step3View = memo(function Step3View({
  profissional,
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
  isSubmitting = false,
}: Step3ViewProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      profissional,
      metodoPagamento: "PIX",
      cobrarMulta: false,
      valorMulta: "",
      cobrarJuros: false,
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (!onProgress) return;

    const totalFields = Object.keys(formValues).length;
    const filledFields = Object.values(formValues).filter(
      (value) => value !== "" && value != null
    ).length;
    
    const progress = Math.round((filledFields / totalFields) * 100);
    onProgress(progress);
  }, [formValues, onProgress]);

  const handlePaymentMethodSelect = (method: Step3["metodoPagamento"]) => {
    setValue("metodoPagamento", method, { shouldValidate: true });
  };

  const handleMultaChange = (checked: boolean) => {
    setValue("cobrarMulta", checked, { shouldValidate: true });
  };

  const handleJurosChange = (checked: boolean) => {
    setValue("cobrarJuros", checked, { shouldValidate: true });
  };

  const handleFormSubmit: SubmitHandler<Step3> = (data) => {
    if (!isSubmitting) {
      // Log dos dados do Step 3 antes de enviar
      console.log('=== DADOS DO STEP 3 ===');
      console.log('Formulário enviado:', data);
      console.log('========================');
      
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase value={profissional} disabled />
      </FieldWrap>

      <MethodsContainer>
        <SectionLabel>
          Disponibilizar meios de pagamento *
        </SectionLabel>
        {PAYMENT_METHODS.map((method) => (
          <MethodLabel key={method}>
            <input
              type="checkbox"
              checked={formValues.metodoPagamento === method}
              onChange={() => handlePaymentMethodSelect(method)}
              disabled={isSubmitting}
            />
            {method}
          </MethodLabel>
        ))}
        {errors.metodoPagamento && (
          <Helper>{errors.metodoPagamento.message}</Helper>
        )}
      </MethodsContainer>

      <SectionLabel>
        Definir multas e juros para todos os boletos após o vencimento *
      </SectionLabel>

      <CheckboxRow>
        <input 
          type="checkbox" 
          checked={formValues.cobrarMulta}
          onChange={(e) => handleMultaChange(e.target.checked)}
          disabled={isSubmitting}
        />
        Cobrar multa
      </CheckboxRow>

      <FieldWrap style={{ marginTop: 8 }}>
        <Label>Valor da multa em %</Label>
        <InputBase
          placeholder="0,00"
          {...register("valorMulta")}
          error={!!errors.valorMulta}
          disabled={!formValues.cobrarMulta || isSubmitting}
        />
        {errors.valorMulta && <Helper>{errors.valorMulta.message}</Helper>}
      </FieldWrap>

      <CheckboxRow style={{ marginTop: 8 }}>
        <input 
          type="checkbox" 
          checked={formValues.cobrarJuros}
          onChange={(e) => handleJurosChange(e.target.checked)}
          disabled={isSubmitting}
        />
        Cobrar juros por dia de atraso (valor 1% ao mês)
      </CheckboxRow>

      <ButtonGroup>
        <Button 
          variant="secondary" 
          type="button" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Concluir"}
        </Button>
      </ButtonGroup>
    </form>
  );
});
