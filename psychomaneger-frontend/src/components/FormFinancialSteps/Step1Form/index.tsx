"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Form, Select, Row, Col } from "antd";
import { Step1Data, step1Schema } from "@/schema/step1Schema";

interface Step1FormProps {
  onSubmit: (data: Step1Data) => void;
  defaultValues?: Step1Data;
  onCancel?: () => void;
}

export default function Step1Form({
  onSubmit,
  defaultValues,
  onCancel,
}: Step1FormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: defaultValues ?? {
      profissional: "João Pedro",
      banco: "",
      tipoConta: "" as any,
      agencia: "",
      conta: "",
      tipoPessoa: "" as any,
      cpf: "",
      razaoSocial: "",
      cnpj: "",
      nomeResponsavel: "",
      cpfResponsavel: "",
      telefone: "",
      nomeCompleto: "",
      cep: "",
      estado: "",
      cidade: "",
      endereco: "",
      numero: "",
    },
  });

  const tipoPessoa = useWatch({ control, name: "tipoPessoa" });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {/* Profissional e Banco */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Profissional"
            validateStatus={errors.profissional ? "error" : ""}
            help={errors.profissional?.message}
          >
            <Controller
              name="profissional"
              control={control}
              render={({ field }) => (
                <>
                  <Input value="João Pedro" disabled />
                  <input type="hidden" {...field} value="João Pedro" />
                </>
              )}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Banco"
            validateStatus={errors.banco ? "error" : ""}
            help={errors.banco?.message}
          >
            <Controller
              name="banco"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Selecione"
                >
                  <Select.Option value="Itau">Itaú</Select.Option>
                  <Select.Option value="Unibanco">Unibanco</Select.Option>
                  <Select.Option value="Bradesco">Bradesco</Select.Option>
                  <Select.Option value="Nubank">Nubank</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Tipo de conta / Agência / Conta */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Tipo de conta"
            validateStatus={errors.tipoConta ? "error" : ""}
            help={errors.tipoConta?.message}
          >
            <Controller
              name="tipoConta"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Selecione"
                >
                  <Select.Option value="Corrente">Corrente</Select.Option>
                  <Select.Option value="Poupança">Poupança</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Agência"
            validateStatus={errors.agencia ? "error" : ""}
            help={errors.agencia?.message}
          >
            <Controller
              name="agencia"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Conta"
            validateStatus={errors.conta ? "error" : ""}
            help={errors.conta?.message}
          >
            <Controller
              name="conta"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Tipo de pessoa / Telefone */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Tipo de pessoa"
            validateStatus={errors.tipoPessoa ? "error" : ""}
            help={errors.tipoPessoa?.message}
          >
            <Controller
              name="tipoPessoa"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Selecione"
                >
                  <Select.Option value="Fisica">Pessoa Física</Select.Option>
                  <Select.Option value="Juridica">
                    Pessoa Jurídica
                  </Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Telefone"
            validateStatus={errors.telefone ? "error" : ""}
            help={errors.telefone?.message}
          >
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="(99) 99999-9999" />
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Campos dinâmicos: Pessoa Física vs Jurídica */}
      {tipoPessoa === "Fisica" && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="CPF"
              validateStatus={errors.cpf ? "error" : ""}
              help={errors.cpf?.message}
            >
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="000.000.000-00" />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Nome completo"
              validateStatus={errors.nomeCompleto ? "error" : ""}
              help={errors.nomeCompleto?.message}
            >
              <Controller
                name="nomeCompleto"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {tipoPessoa === "Juridica" && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Razão Social"
                validateStatus={errors.razaoSocial ? "error" : ""}
                help={errors.razaoSocial?.message}
              >
                <Controller
                  name="razaoSocial"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="CNPJ"
                validateStatus={errors.cnpj ? "error" : ""}
                help={errors.cnpj?.message}
              >
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="00.000.000/0000-00" />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nome do responsável"
                validateStatus={errors.nomeResponsavel ? "error" : ""}
                help={errors.nomeResponsavel?.message}
              >
                <Controller
                  name="nomeResponsavel"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="CPF do responsável"
                validateStatus={errors.cpfResponsavel ? "error" : ""}
                help={errors.cpfResponsavel?.message}
              >
                <Controller
                  name="cpfResponsavel"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="000.000.000-00" />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      {/* Endereço */}
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="CEP"
            validateStatus={errors.cep ? "error" : ""}
            help={errors.cep?.message}
          >
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="00000-000" />
              )}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Estado"
            validateStatus={errors.estado ? "error" : ""}
            help={errors.estado?.message}
          >
            <Controller
              name="estado"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Cidade"
            validateStatus={errors.cidade ? "error" : ""}
            help={errors.cidade?.message}
          >
            <Controller
              name="cidade"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Número"
            validateStatus={errors.numero ? "error" : ""}
            help={errors.numero?.message}
          >
            <Controller
              name="numero"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Endereço"
            validateStatus={errors.endereco ? "error" : ""}
            help={errors.endereco?.message}
          >
            <Controller
              name="endereco"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Botões */}
      <Row justify="space-between">
        <Col>
          <Button onClick={onCancel} danger>
            Cancelar
          </Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Próximo
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
