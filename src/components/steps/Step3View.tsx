// Step3View.tsx
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step3, step3Schema } from "../../schema";
import { FieldWrap, Label, InputBase, Helper } from "../primitives/Field";
import { Button } from "../primitives/Button";
import styled from "styled-components";

const MethodsContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
  margin-bottom: 16px;
`;

const MethodLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #6b7280;

  input {
    width: 16px;
    height: 16px;
    accent-color: #7c3aed; // lilás quando marcado
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
    accent-color: #7c3aed;
  }
`;

interface Step3ViewProps {
  profissional: string;
  defaultValues?: Step3;
  onCancel: () => void;
  onSubmit: (d: Step3) => void;
  onProgress?: (progress: number) => void;
}

export function Step3View({
  profissional,
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
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
      jurosDia: false,
    },
  });

  const values = watch();

  useEffect(() => {
    if (onProgress) {
      const total = Object.keys(values).length;
      const filled = Object.values(values).filter(
        (v) => v !== "" && v != null
      ).length;
      onProgress(Math.round((filled / total) * 100));
    }
  }, [values, onProgress]);

  const metodos = ["PIX", "Cartão de crédito", "Boleto Bancário"] as const;

  const handleSelectMetodo = (m: Step3["metodoPagamento"]) => {
    setValue("metodoPagamento", m, { shouldValidate: true });
  };

  const handleFormSubmit: SubmitHandler<Step3> = (data) => {
    onSubmit(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldWrap>
        <Label>Profissional</Label>
        <InputBase value={profissional} disabled />
      </FieldWrap>

      <MethodsContainer>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
          Disponibilizar meios de pagamento *
        </div>
        {metodos.map((m) => (
          <MethodLabel key={m}>
            <input
              type="checkbox"
              checked={values.metodoPagamento === m}
              onChange={() => handleSelectMetodo(m)}
            />
            {m}
          </MethodLabel>
        ))}
        {errors.metodoPagamento && (
          <Helper>{errors.metodoPagamento.message}</Helper>
        )}
      </MethodsContainer>

      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
        Definir multas e juros para todos os boletos após o vencimento
      </div>

      <CheckboxRow>
        <input type="checkbox" {...register("cobrarMulta")} />
        Cobrar multa (%)
      </CheckboxRow>

      <FieldWrap style={{ marginTop: 8 }}>
        <InputBase
          placeholder="0,00"
          {...register("valorMulta")}
          error={!!errors.valorMulta}
        />
        {errors.valorMulta && <Helper>{errors.valorMulta.message}</Helper>}
      </FieldWrap>

      <CheckboxRow style={{ marginTop: 8 }}>
        <input type="checkbox" {...register("jurosDia")} />
        Cobrar juros por dia de atraso (valor 1% ao mês)
      </CheckboxRow>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Concluir</Button>
      </div>
    </form>
  );
}
