"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Form, Checkbox, Select } from "antd";
import { Step3Data, step3Schema } from "@/schema/step3Schema";

interface Step3FormProps {
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
  defaultValues?: Step3Data;
}

export default function Step3Form({ onSubmit, onBack, defaultValues }: Step3FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: defaultValues ?? {
      profissional: "",
      pix: false,
      cartao: false,
      boleto: false,
      jurosAtivo: false,
      jurosValor: "",
      multaAtiva: false,
      multaValor: "",
      jurosAtrasoAtivo: false,
      jurosAtrasoValor: "",
    },
  });

  const watchMulta = watch("multaAtiva");
  const watchJuros = watch("jurosAtivo");
  const watchJurosAtraso = watch("jurosAtrasoAtivo");

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Profissional"
        help={errors.profissional?.message}
        validateStatus={errors.profissional ? "error" : ""}
      >
        <Select
          placeholder="Selecione um profissional"
          onChange={(val) => setValue("profissional", val)}
        >
          <Select.Option value="prof1">Dr. João</Select.Option>
          <Select.Option value="prof2">Dra. Maria</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Disponibilizar meios de pagamento">
        <Checkbox onChange={(e) => setValue("pix", e.target.checked)}>
          Pix
        </Checkbox>
        <Checkbox onChange={(e) => setValue("cartao", e.target.checked)}>
          Cartão de crédito
        </Checkbox>
        <Checkbox onChange={(e) => setValue("boleto", e.target.checked)}>
          Boleto bancário
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox {...register("jurosAtivo")}>Cobrar juros</Checkbox>
        {watchJuros && (
          <Input
            placeholder="Juros % ao mês"
            {...register("jurosValor")}
            style={{ marginTop: 8 }}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Checkbox {...register("multaAtiva")}>Cobrar multa</Checkbox>
        {watchMulta && (
          <Input
            placeholder="Multa %"
            {...register("multaValor")}
            style={{ marginTop: 8 }}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Checkbox {...register("jurosAtrasoAtivo")}>
          Cobrar juros por dia de atraso
        </Checkbox>
        {watchJurosAtraso && (
          <Input
            placeholder="Juros % ao mês"
            {...register("jurosAtrasoValor")}
            style={{ marginTop: 8 }}
          />
        )}
      </Form.Item>
      <div className="flex justify-between">
        <Button onClick={onBack}>Voltar</Button>
        <Button type="primary" htmlType="submit">
          Concluir
        </Button>
      </div>
    </Form>
  );
}
