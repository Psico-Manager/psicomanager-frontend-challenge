"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Form, Select } from "antd";
import { Step2Data, step2Schema } from "@/schema/step2Schema";

interface Step2FormProps {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Step2Data;
}

export default function Step2Form({ onSubmit, onBack, defaultValues }: Step2FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: defaultValues ?? {
      emailCobranca: "",
      mensagemPadrao: "",
    },
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Enviar cobrança por e-mail"
        help={errors.emailCobranca?.message}
        validateStatus={errors.emailCobranca ? "error" : ""}
      >
        <Select
          placeholder="Selecione uma clínica"
          onChange={(val) => setValue("emailCobranca", val)}
        >
          <Select.Option value="clinica1@email.com">Clínica 1</Select.Option>
          <Select.Option value="clinica2@email.com">Clínica 2</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Mensagem padrão"
        help={errors.mensagemPadrao?.message}
        validateStatus={errors.mensagemPadrao ? "error" : ""}
      >
        <Controller
          name="mensagemPadrao"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              rows={6}
              placeholder="Olá {{NOME_CLIENTE}}, segue link para pagamento..."
            />
          )}
        />
      </Form.Item>
      <div className="flex justify-between">
        <Button onClick={onBack}>Voltar</Button>
        <Button type="primary" htmlType="submit">
          Próximo
        </Button>
      </div>
    </Form>
  );
}
