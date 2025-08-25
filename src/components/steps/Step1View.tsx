// Step1View.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Step1, Step1Fields, FormFieldProps } from "src/@types/step1";
import { step1Schema } from "../../schema";
import { Button } from "../primitives/Button";
import { maskCEP, maskCNPJ, maskCPF, maskPhone } from "../../utils/masks";
import { FormField } from "../primitives/FormField";
import { AlertBox } from "../primitives/Alertbox";
import { BoldSpan } from "../primitives/span";

// Row2 e Row21 responsivos
const Row2 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* 1 input por linha */
  }
`;

const Row21 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* 1 input por linha */
  }
`;

// GridItem ocupa 100% em telas pequenas
const GridItem = styled.div<{ colSpan?: number }>`
  grid-column: span ${(props) => props.colSpan ?? 1};

  @media (max-width: 900px) {
    grid-column: span 1;
    width: 100%;
  }
`;

// Grid já estava responsivo
const Grid = styled.div<{ columns?: number; alignStart?: boolean }>`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(${(props) => props.columns ?? 2}, 1fr);
  justify-items: ${(props) => (props.alignStart ? "start" : "stretch")};

  @media (max-width: 900px) {
    grid-template-columns: 1fr; /* todos inputs em 1 coluna */
  }
`;

type FieldConfig = Omit<
  FormFieldProps,
  "register" | "errors" | "setValue" | "trigger"
> & { colSpan?: number };

export function Step1View({
  defaultValues,
  onCancel,
  onSubmit,
  onProgress,
}: {
  defaultValues?: Step1;
  onCancel: () => void;
  onSubmit: (d: Step1) => void;
  onProgress: (progress: number) => void;
}) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    defaultValues: {
      profissional: "Jean Roberto", // valor default
      ...defaultValues,
    },
  });

  const tipoPessoa = watch("tipoPessoa");

  // Limpar campos quando mudar tipoPessoa
  useEffect(() => {
    if (tipoPessoa === "PF") {
      ["cnpj", "responsavelNome", "responsavelCpf"].forEach((f) =>
        setValue(f as Step1Fields, "")
      );
    } else {
      setValue("cpf" as Step1Fields, "");
      setValue("nomeCompleto" as Step1Fields, "");
    }
  }, [tipoPessoa, setValue]);

  // Calcular progresso do formulário
  const watchedValues = watch([
    "profissional",
    "banco",
    "tipoConta",
    "agencia",
    "conta",
    "tipoPessoa",
    "cpf",
    "cnpj",
    "telefone",
    "nomeCompleto",
    "responsavelNome",
    "responsavelCpf",
    "cep",
    "estado",
    "cidade",
    "endereco",
    "numero",
  ]);

  useEffect(() => {
    const total = watchedValues.length;
    const filled = watchedValues.filter((v) => v !== "" && v != null).length;
    onProgress(Math.round((filled / total) * 100));
  }, [watchedValues, onProgress]);

  const fields: Record<string, FieldConfig> = {
    profissional: {
      name: "profissional",
      label: "Profissional",
      disabled: true,
    },
    banco: {
      name: "banco",
      label: "Banco *",
      type: "select",
      options: [
        { label: "Banco do Brasil", value: "Banco do Brasil" },
        { label: "Bradesco", value: "Bradesco" },
        { label: "Caixa", value: "Caixa" },
        { label: "Itaú", value: "Itaú" },
        { label: "Nubank", value: "Nubank" },
        { label: "Santander", value: "Santander" },
      ],
    },
    tipoConta: {
      name: "tipoConta",
      label: "Tipo de conta *",
      type: "select",
      options: [
        { label: "Corrente", value: "Corrente" },
        { label: "Poupança", value: "Poupança" },
      ],
    },
    agencia: {
      name: "agencia",
      label: "Agência *",
      placeholder: "Digite aqui",
    },
    conta: {
      name: "conta",
      label: "Conta com dígito *",
      placeholder: "Digite aqui",
    },
    tipoPessoa: {
      name: "tipoPessoa",
      label: "Tipo de pessoa *",
      type: "select",
      options: [
        { label: "PF", value: "PF" },
        { label: "PJ", value: "PJ" },
      ],
    },
    cpf: {
      name: "cpf",
      label: "CPF *",
      placeholder: "000.000.000-00",
      mask: maskCPF,
    },
    telefone: {
      name: "telefone",
      label: "Telefone *",
      placeholder: "(00) 00000-0000",
      mask: maskPhone,
    },
    nomeCompleto: {
      name: "nomeCompleto",
      label: "Nome completo *",
      placeholder: "Digite aqui",
    },
    cep: {
      name: "cep",
      label: "CEP *",
      placeholder: "00000-000",
      mask: maskCEP,
    },
    estado: {
      name: "estado",
      label: "Estado *",
      type: "select",
      options: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ].map((uf) => ({ label: uf, value: uf })),
    },
    cidade: { name: "cidade", label: "Cidade *", placeholder: "Digite aqui" },
    endereco: {
      name: "endereco",
      label: "Endereço *",
      placeholder: "Digite aqui",
    },
    numero: { name: "numero", label: "Número *", placeholder: "Digite aqui" },
  };

  const onSubmitForm = async (data: Step1) => {
    const valid = await trigger();
    if (!valid) return;
    onSubmit(data);
  };

  const renderField = (f: FieldConfig) => (
    <FormField
      key={f.name}
      watch={watch}
      {...f}
      register={register}
      errors={errors}
      setValue={setValue}
      trigger={trigger}
    />
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px", // espaçamento vertical entre todos os elementos
      }}
    >
      <BoldSpan>
        Preencha os itens a seguir para configurar o PsicoBank
      </BoldSpan>

      <AlertBox variant="yellow">
        <strong>
          Atenção! Verifique atentamente a cada dado preenchido no cadastro de
          sua conta.{" "}
        </strong>
        <ul>
          <li>
            Caso queira cadastrar uma conta de banco CNPJ, verifique se a sua
            conta corrente é CNPJ e preencha o CPF correto do responsável da
            conta.
          </li>
          <li>
            O preenchimento incorreto das informações pode trazer transtornos no
            momento da transferência do valor para essa conta corrente.
          </li>
          <li>Se possível, preencha com calma para não ocorrer erros.</li>
        </ul>
      </AlertBox>

      <Grid>
        <GridItem colSpan={3}>{renderField(fields.profissional)}</GridItem>
        <GridItem colSpan={3}>
          <Row2>
            {renderField(fields.banco)}
            {renderField(fields.tipoConta)}
          </Row2>
        </GridItem>
        <GridItem colSpan={3}>
          <Row2>
            {renderField(fields.agencia)}
            {renderField(fields.conta)}
          </Row2>
        </GridItem>
        <GridItem>{renderField(fields.tipoPessoa)}</GridItem>

        <GridItem>
          {tipoPessoa === "PF"
            ? renderField(fields.cpf)
            : renderField({
                ...fields.cpf,
                name: "cnpj",
                label: "CNPJ *",
                placeholder: "00.000.000/0000-00",
                mask: maskCNPJ,
              })}
        </GridItem>

        <GridItem>{renderField(fields.telefone)}</GridItem>

        <GridItem colSpan={3}>
          {tipoPessoa === "PF" ? (
            renderField(fields.nomeCompleto)
          ) : (
            <Row2>
              {renderField({
                ...fields.nomeCompleto,
                name: "responsavelNome",
                label: "Nome do responsável *",
                placeholder: "Digite o nome",
              })}
              {renderField({
                ...fields.cpf,
                name: "responsavelCpf",
                label: "CPF do responsável *",
                placeholder: "000.000.000-00",
                mask: maskCPF,
              })}
            </Row2>
          )}
        </GridItem>

        <GridItem>{renderField(fields.cep)}</GridItem>
        <GridItem>{renderField(fields.estado)}</GridItem>
        <GridItem>{renderField(fields.cidade)}</GridItem>

        <GridItem colSpan={3}>
          <Row21>
            {renderField(fields.endereco)}
            {renderField(fields.numero)}
          </Row21>
        </GridItem>
      </Grid>

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
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
}
